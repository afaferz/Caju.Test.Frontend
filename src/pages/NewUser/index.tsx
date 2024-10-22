import * as React from "react";
import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";

function NewUserPage() {
    const history = useHistory();
    const goToHome = () => {
        history.push(routes.dashboard);
    };

    return (
        <S.Container>
            <S.Card>
                <IconButton onClick={() => goToHome()} aria-label="back">
                    <HiOutlineArrowLeft size={24} />
                </IconButton>
                <TextField placeholder="Nome" label="Nome" $block />
                <TextField
                    placeholder="Email"
                    label="Email"
                    type="email"
                    $block
                />
                <TextField placeholder="CPF" label="CPF" $block />
                <TextField label="Data de admissão" type="date" $block />
                <Button onClick={() => {}}>Cadastrar</Button>
            </S.Card>
        </S.Container>
    );
}

export default NewUserPage;
