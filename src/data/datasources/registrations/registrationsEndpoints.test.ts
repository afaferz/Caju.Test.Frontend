import endpoints from "./registrationsEndpoints";

describe("data", () => {
    describe("datasource", () => {
        describe("registrations", () => {
            describe("registrationsEndpoints", () => {
                it("should return the registrations endpoint", async () => {
                    expect(endpoints.find_all).toEqual("/registrations");
                    expect(endpoints.create_one).toEqual("/registrations");
                    expect(endpoints.find_one).toEqual("/registrations/:id");
                    expect(endpoints.update_one).toEqual("/registrations/:id");
                    expect(endpoints.delete_one).toEqual("/registrations/:id");
                });
            });
        });
    });
});
