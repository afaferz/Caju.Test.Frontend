import * as React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import { RegistrationStatus } from "~/data/domain/entities/registrations/registrationsStatus";
import { RegistrationModel } from "~/data/models/registration/registrationModel";
import useObservable from "~/hooks/observable.hook";
import registrationsProvider from "~/providers/registrations/registrations.provider";
import registrationStore from "~/store/registrations/registrations.store";
import routes from "~/router/routes";
import CpfUtils from "~/utils/cpf.utils";
import EmailUtils from "~/utils/email.utils";
import MaskUtils from "~/utils/mask.utils";

const CLEAR_MASK_LOOKUP = {
    employeeName: /[^A-Za-z\s]/g,
    cpf: /[^0-9*]/g,
} as Record<string, RegExp>;

const RegisterForm = React.memo(() => {
    const history = useHistory();
    const store = registrationStore();
    const provider = registrationsProvider();
    const registration = useObservable<RegistrationModel>(
        store.registration,
        {} as RegistrationModel
    );
    const loading = useObservable(store.loading, false);
    const goToHome = () => history.push(routes.dashboard);

    const [field, setField] = React.useState({
        employeeName: "",
        email: "",
        cpf: "",
        admissionDate: "",
    });

    const mask$1 = (valueIn: string, mask: string, clear: RegExp) => {
        let value = "";
        value = valueIn.replace(clear, "");
        value = mask
            ? MaskUtils.format(value, mask).substring(0, mask.length)
            : value;
        return value;
    };

    const updateField = (key: string, value: string, mask?: string) => {
        const masked = mask$1(value, mask!, CLEAR_MASK_LOOKUP[key] ?? "");
        store.updateRegistration({
            ...registration,
            [key]: mask$1(value, mask ?? "", CLEAR_MASK_LOOKUP[key] ?? ""),
        });
        setField((prev) => ({
            ...prev,
            [key]: masked,
        }));
    };

    const employeeNameError = React.useMemo(() => {
        const valid =
            /^[A-Za-z][A-Za-z\s]*[A-Za-z]$/.test(field.employeeName.trim()) &&
            field.employeeName.trim().length > 1 &&
            field.employeeName.trim().includes(" ");
        let error = "";
        if (!valid)
            error =
                "Nome inválido. Deve conter pelo menos duas letras e um espaço.";
        else if (!field.employeeName) error = "Nome é obrigatório.";
        else error = "";
        return error;
    }, [field]);

    const cpfError = React.useMemo(() => {
        let error = "";
        if (!field.cpf) error = "CPF é obrigatório.";
        else if (!CpfUtils.isValid(field.cpf)) error = "CPF inválido.";
        else error = "";
        return error;
    }, [field]);

    const emailError = React.useMemo(() => {
        let error = "";
        if (!field.email) error = "Email é obrigatório.";
        else if (!EmailUtils.isValid(field.email)) error = "Email inválido.";
        else error = "";
        return error;
    }, [field]);

    const admissionDateError = React.useMemo(() => {
        let error = "";
        if (!field.admissionDate) error = "Data de admissão é obrigatória.";
        else error = "";
        return error;
    }, [field]);

    const valid = React.useMemo(() => {
        return (
            !employeeNameError &&
            !cpfError &&
            !emailError &&
            !admissionDateError
        );
    }, [employeeNameError, cpfError, emailError, admissionDateError]);

    const submit$1 = async () => {
        if (valid) {
            const admissionDate = new Intl.DateTimeFormat("pt-BR", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
            }).format(new Date(registration?.admissionDate));
            await provider.createRegistration({
                ...registration,
                admissionDate: admissionDate,
                status: RegistrationStatus.REVIEW,
            });
            goToHome();
        }
    };

    return (
        <>
            <IconButton onClick={() => goToHome()} aria-label="back">
                <HiOutlineArrowLeft size={24} />
            </IconButton>

            <TextField
                placeholder="Nome"
                label="Nome"
                $block
                value={field.employeeName}
                error={employeeNameError}
                onChange={(e) => updateField("employeeName", e.target.value)}
            />

            <TextField
                placeholder="Email"
                label="Email"
                type="email"
                $block
                value={field.email}
                error={emailError}
                onChange={(e) => updateField("email", e.target.value)}
            />

            <TextField
                placeholder="CPF"
                label="CPF"
                $block
                value={field.cpf}
                error={cpfError}
                onChange={(e) =>
                    updateField("cpf", e.target.value, "999.999.999-99")
                }
            />

            <TextField
                placeholder="Data de admissão"
                label="Data de admissão"
                type="date"
                $block
                value={field.admissionDate}
                error={admissionDateError}
                onChange={(e) => updateField("admissionDate", e.target.value)}
            />

            <Button
                $block
                $loading={loading}
                $disabled={loading || !valid}
                $color="#64a98c"
                $minWidth={"175px"}
                $rounded
                $variant="medium"
                $click={() => submit$1()}
            >
                Cadastrar
            </Button>
        </>
    );
});

export default RegisterForm;
