import React from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import MaskUtils from "~/utils/mask.utils";
import CpfUtils from "~/utils/cpf.utils";
import registrationsProvider from "~/providers/registrations/registrations.provider";

const CLEAR_MASK_EXP = /[^0-9*]/g;

const SearchBar = React.memo(() => {
    const history = useHistory();

    const provider = registrationsProvider();

    const goToNewAdmissionPage = () => {
        history.push(routes.newUser);
    };

    const [document, setDocument] = React.useState<string>("");

    const isValidDocument = React.useMemo(
        () => CpfUtils.isValid(document),
        [document]
    );
    const documentError = React.useMemo(() => {
        const documentUnmasked = document.replace(CLEAR_MASK_EXP, "");
        return !isValidDocument && documentUnmasked.length >= 11
            ? "CPF inválido."
            : "";
    }, [document]);

    
    React.useEffect(() => {
        const unmasked = document.replace(CLEAR_MASK_EXP, "");
        if (unmasked.length >= 11) search(unmasked);
    }, [isValidDocument]);

    async function search(cpf: string) {
        await provider.getRegistrationByFilter({ cpf });
    }

    function handleCpf(valueIn: string) {
        let value = "";
        value = valueIn.replace(CLEAR_MASK_EXP, "");
        const mask = "999.999.999-99";
        value = MaskUtils.format(value, mask).substring(0, mask.length);
        setDocument(value);
    }

    return (
        <S.Container>
            <TextField
                value={document}
                placeholder="Digite um CPF válido"
                label="CPF"
                onChange={(e) => handleCpf(e.target.value)}
                error={documentError}
            />
            <S.Actions>
                <IconButton aria-label="refetch">
                    <HiRefresh />
                </IconButton>
                <Button onClick={() => goToNewAdmissionPage()}>
                    Nova Admissão
                </Button>
            </S.Actions>
        </S.Container>
    );
});
export { SearchBar };
