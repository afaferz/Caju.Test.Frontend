import * as React from "react";
import Button from "~/components/Buttons";
import * as S from "./styles";
import {
    HiOutlineMail,
    HiOutlineUser,
    HiOutlineCalendar,
    HiOutlineTrash,
} from "react-icons/hi";
import { RegistrationModel } from "~/data/models/registration/registrationModel";
import If from "~/components/Common/If";
import { RegistrationStatus } from "~/data/domain/entities/registrations/registrationsStatus";
import registrationStore from "~/store/registrations/registrations.store";
import useObservable from "~/hooks/observable.hook";
import registrationsProvider from "~/providers/registrations/registrations.provider";

type Props = {
    data: RegistrationModel;
    $action: (
        fn: (...args: any[]) => Promise<void> | void,
        data: any[]
    ) => void;
};

const RegistrationCard = (props: Props) => {
    const { data, $action } = props;

    const store = registrationStore();
    const provider = registrationsProvider();
    const loading = useObservable(store.loading, false);

    async function update$1(
        registration: RegistrationModel,
        status: (typeof RegistrationStatus)[keyof typeof RegistrationStatus]
    ) {
        const payload = {
            ...registration,
            status,
        };
        await provider.updateRegistration(payload);
    }

    async function delete$1(registration: RegistrationModel) {
        await provider.deleteRegistration(registration.id);
    }

    return (
        <S.Card>
            <S.IconAndText>
                <HiOutlineUser />
                <h3>{data.employeeName}</h3>
            </S.IconAndText>
            <S.IconAndText>
                <HiOutlineMail />
                <p>{data.email}</p>
            </S.IconAndText>
            <S.IconAndText>
                <HiOutlineCalendar />
                <span>{data.admissionDate}</span>
            </S.IconAndText>
            <S.Actions>
                <If test={data.status === RegistrationStatus.REVIEW}>
                    <Button
                        $variant="small"
                        $color="rgb(255, 145, 154)"
                        $loading={loading}
                        $click={() =>
                            $action(update$1, [
                                data,
                                RegistrationStatus.REPROVED,
                            ])
                        }
                        $minWidth={"85px"}
                    >
                        Reprovar
                    </Button>
                </If>
                <If test={data.status === RegistrationStatus.REVIEW}>
                    <Button
                        $variant="small"
                        $color="rgb(155, 229, 155)"
                        $loading={loading}
                        $click={() =>
                            $action(update$1, [
                                data,
                                RegistrationStatus.APPROVED,
                            ])
                        }
                        $minWidth={"85px"}
                    >
                        Aprovar
                    </Button>
                </If>
                <If test={data.status !== RegistrationStatus.REVIEW}>
                    <Button
                        $variant="small"
                        $color="#ff8858"
                        $loading={loading}
                        $click={() =>
                            $action(update$1, [data, RegistrationStatus.REVIEW])
                        }
                        $minWidth={"175px"}
                    >
                        Revisar novamente
                    </Button>
                </If>

                <HiOutlineTrash onClick={() => $action(delete$1, [data])} />
            </S.Actions>
        </S.Card>
    );
};

export default RegistrationCard;
