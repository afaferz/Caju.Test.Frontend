const endpoints = {
    find_all: "/registrations",
    create_one: "/registrations",
    find_one: "/registrations/:id",
    update_one: "/registrations/:id",
    delete_one: "/registrations/:id",
} as const;

export default endpoints;
