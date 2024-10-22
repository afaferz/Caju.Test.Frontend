import * as React from "react";
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
import useObservable from "~/hooks/observable.hook";
import registrationStore from "~/store/registrations/registrations.store";

const CLEAR_MASK_EXP = /[^0-9*]/g;

const SearchBar = React.memo(() => {
    const history = useHistory();

    const provider = registrationsProvider();
    const store = registrationStore();

    const loading = useObservable(store.loading, false);

    const goToNewAdmissionPage = () => history.push(routes.newUser);

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
    }, [document, isValidDocument]);

    const search = React.useCallback(
        async (cpf: string) => await provider.getRegistrationByFilter({ cpf }),
        [provider]
    );

    React.useEffect(() => {
        const unmasked = document.replace(CLEAR_MASK_EXP, "");
        if (unmasked.length >= 11 && isValidDocument) search(unmasked);
    }, [isValidDocument, document, search]);

    async function refetch() {
        setDocument("");
        await provider.getAllRegistrations();
    }

    function handleCpf(valueIn: string) {
        let value = "";
        value = valueIn.replace(CLEAR_MASK_EXP, "");
        const mask = "999.999.999-99";
        value = MaskUtils.format(value, mask).substring(0, mask.length);
        setDocument(value);
    }

    return (
        <S.Container data-testid="test--search-bar">
            <TextField
                value={document}
                placeholder="Digite um CPF válido"
                onChange={(e) => handleCpf(e.target.value)}
                error={documentError}
            />
            <S.Actions>
                <IconButton aria-label="refetch" onClick={refetch}>
                    <HiRefresh />
                </IconButton>
                <Button
                    $disabled={loading}
                    $loading={loading}
                    $color="#64a98c"
                    $minWidth={"175px"}
                    $variant="large"
                    onClick={() => goToNewAdmissionPage()}
                >
                    Nova Admissão
                </Button>
            </S.Actions>
        </S.Container>
    );
});
export default SearchBar;
