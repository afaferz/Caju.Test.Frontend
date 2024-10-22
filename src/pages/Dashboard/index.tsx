import * as React from "react";
import Collumns from "./components/Columns";
import * as S from "./styles";
import SearchBar from "./components/Searchbar";
import registrationsProvider from "~/providers/registrations/registrations.provider";
import useObservable from "~/hooks/observable.hook";
import registrationStore from "~/store/registrations/registrations.store";

const DashboardPage = () => {
    const provider = registrationsProvider();
    const store = registrationStore();

    const registrations = useObservable(store.registrations, []);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        fetchRegistrations();
    }, []);

    async function fetchRegistrations() {
        setLoading(true);
        await provider.getAllRegistrations();
        setLoading(false);
    }
    return (
        <S.Container>
            <SearchBar />
            <Collumns registrations={registrations} loading={loading} />
        </S.Container>
    );
};
export default DashboardPage;
