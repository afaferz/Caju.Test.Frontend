import * as React from "react";
import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { RegistrationModel } from "~/data/models/registration/registrationModel";
import Spinner from "~/components/Spinner";
import If from "~/components/Common/If";
import Modal, {
    _ModalSubtitleStyled,
    _ModalTitleStyled,
} from "~/components/Modal";
import registrationStore from "~/store/registrations/registrations.store";
import useObservable from "~/hooks/observable.hook";

const COLLUMNS = [
    { status: "REVIEW", title: "Pronto para revisar" },
    { status: "APPROVED", title: "Aprovado" },
    { status: "REPROVED", title: "Reprovado" },
];

type Action = [(...args: any[]) => Promise<void> | void, any];
type Props = {
    registrations?: RegistrationModel[];
};
const Collumns = React.memo((props: Props) => {
    const { registrations } = props;

    const store = registrationStore();
    const loading = useObservable(store.loading, false);

    const [open, setOpen] = React.useState(false);
    const [action, setAction] = React.useState<Action | null>(null);

    const open$1 = (
        fn: (...args: any[]) => Promise<void> | void,
        data: any[]
    ) => {
        setOpen(true);
        setAction([fn, data]);
    };
    const close$1 = () => setOpen(false);
    const confirm$1 = async () => {
        const [fn, data] = action!;
        if (fn) {
            await fn.apply(this, [...data]);
            close$1();
        }
    };

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
            {COLLUMNS.map((collum) => {
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
                                                    $action={(fn, data) =>
                                                        open$1(fn, data)
                                                    }
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
            <Modal
                open={open}
                $loading={loading}
                $cancel={() => close$1()}
                $confirm={() => confirm$1()}
            >
                <_ModalTitleStyled>
                    Tem certeza que deseja continuar?
                </_ModalTitleStyled>
                <_ModalSubtitleStyled>
                    Essa ação é irreversível. Você deverá adicionar um novo
                    registro manualmente
                </_ModalSubtitleStyled>
            </Modal>
        </S.Container>
    );
});
export default Collumns;
