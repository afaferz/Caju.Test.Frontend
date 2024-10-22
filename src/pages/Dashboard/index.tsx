import * as React from "react";
import * as S from "./styles";
import Collumns from "./components/Collumns";
import SearchBar from "./components/Searchbar";
import registrationsProvider from "~/providers/registrations/registrations.provider";
import useObservable from "~/hooks/observable.hook";
import registrationStore from "~/store/registrations/registrations.store";

function DashboardPage() {
    const provider = registrationsProvider();
    const store = registrationStore();

    const registrations = useObservable(store.registrations, []);

    React.useEffect(() => {
        fetchRegistrations();
    }, []);

    async function fetchRegistrations() {
        await provider.getAllRegistrations();
    }
    return (
        <S.Container>
            <SearchBar />
            <Collumns registrations={registrations} />
        </S.Container>
    );
}
export default DashboardPage;
