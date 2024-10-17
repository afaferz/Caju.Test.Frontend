const endpoints = {
    find_all: "/registrations",
    find_one: "/registrations/:id",
    update_one: "/registrations/:id",
    create_one: "/registrations",
    delete_one: "/registrations/:id",
} as const;

export default endpoints;
