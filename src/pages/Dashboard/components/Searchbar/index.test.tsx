// import React from "react";
// import { HiRefresh } from "react-icons/hi";
// import { useHistory } from "react-router-dom";
// import Button from "~/components/Buttons";
// import { IconButton } from "~/components/Buttons/IconButton";
// import TextField from "~/components/TextField";
// import routes from "~/router/routes";
// import * as S from "./styles";
// import MaskUtils from "~/utils/mask.utils";
// import CpfUtils from "~/utils/cpf.utils";

// const CLEAR_MASK_EXP = /[^0-9*]/g;
// export const SearchBar = () => {
//     const history = useHistory();

//     const goToNewAdmissionPage = () => {
//         history.push(routes.newUser);
//     };

//     const [document, setDocument] = React.useState<string>("");

//     const IS_VALID = React.useMemo(
//         () => CpfUtils.isValid(document),
//         [document]
//     );

//     function handleCpf(valueIn: string) {
//         let value = "";
//         value = valueIn.replace(CLEAR_MASK_EXP, "");
//         const mask = "999.999.999-99";
//         value = MaskUtils.format(value, mask).substring(0, mask.length);
//         setDocument(value);
//     }

//     return (
//         <S.Container>
//             {JSON.stringify(IS_VALID)}
//             <TextField
//                 value={document}
//                 onChange={(e) => handleCpf(e.target.value)}
//                 placeholder="Digite um CPF válido"
//             />
//             <S.Actions>
//                 <IconButton aria-label="refetch">
//                     <HiRefresh />
//                 </IconButton>
//                 <Button onClick={() => goToNewAdmissionPage()}>
//                     Nova Admissão
//                 </Button>
//             </S.Actions>
//         </S.Container>
//     );
// };
