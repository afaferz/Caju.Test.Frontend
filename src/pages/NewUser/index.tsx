import * as React from "react";
import * as S from "./styles";
import RegisterForm from "./components/RegisterForm";

function NewUserPage() {
    return (
        <S.Container>
            <S.Card>
                <RegisterForm />
            </S.Card>
        </S.Container>
    );
}

export default NewUserPage;
