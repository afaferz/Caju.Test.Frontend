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

type Props = {
    data: RegistrationModel;
    onDelete?: () => Promise<void>;
};

const RegistrationCard = (props: Props) => {
    const { data, onDelete } = props;

    return (
        <S.Card>
            {data.status}
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
                    <Button $variant="small" $color="rgb(255, 145, 154)">
                        Reprovar
                    </Button>
                </If>
                <If test={data.status === RegistrationStatus.REVIEW}>
                    <Button $variant="small" $color="rgb(155, 229, 155)">
                        Aprovar
                    </Button>
                </If>
                <If test={data.status !== RegistrationStatus.REVIEW}>
                    <Button $variant="small" $color="#ff8858">
                        Revisar novamente
                    </Button>
                </If>

                <HiOutlineTrash onClick={onDelete} />
            </S.Actions>
        </S.Card>
    );
};

export default RegistrationCard;
