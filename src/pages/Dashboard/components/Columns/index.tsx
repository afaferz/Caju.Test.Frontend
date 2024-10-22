import * as React from "react";
import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { RegistrationModel } from "~/data/models/registration/registrationModel";
import { Spinner } from "~/components/Spinner";
import If from "~/components/Common/If";

const allColumns = [
    { status: "REVIEW", title: "Pronto para revisar" },
    { status: "APPROVED", title: "Aprovado" },
    { status: "REPROVED", title: "Reprovado" },
];

type Props = {
    registrations?: RegistrationModel[];
    loading?: boolean;
};
const Collumns = (props: Props) => {
    const { registrations, loading } = props;

    const filter$1 = React.useCallback(
        (status: string) => {
            const data = registrations?.filter(
                (registration) => registration.status === status
            );
            return data ?? [];
        },
        [registrations]
    );
    return (
        <S.Container>
            {allColumns.map((collum) => {
                return (
                    <S.Column status={collum.status} key={collum.title}>
                        <>
                            <S.TitleColumn status={collum.status}>
                                {collum.title}
                            </S.TitleColumn>
                            <S.CollumContent>
                                <If test={loading}>
                                    <S.CollumSubtitle>
                                        <Spinner color="#ccc" />
                                    </S.CollumSubtitle>
                                </If>
                                <If
                                    test={
                                        (registrations ?? []).length === 0 &&
                                        !loading
                                    }
                                >
                                    <S.CollumSubtitle>
                                        Nenhum registro encontrado
                                    </S.CollumSubtitle>
                                </If>
                                <If
                                    test={
                                        (registrations ?? []).length > 0 &&
                                        !loading
                                    }
                                >
                                    {(filter$1(collum.status) ?? []).map(
                                        (registration) => {
                                            return (
                                                <RegistrationCard
                                                    data={registration}
                                                    key={registration.id}
                                                />
                                            );
                                        }
                                    )}
                                </If>
                            </S.CollumContent>
                        </>
                    </S.Column>
                );
            })}
        </S.Container>
    );
};
export default Collumns;
