import gql from "graphql-tag";

export const UPDATE_USER = gql`
    mutation Mutation($updateUserId: Int!, $nombre: String, $email: String, $edad: Int) {
        updateUser(id: $updateUserId, nombre: $nombre, email: $email, edad: $edad) {
            id
            nombre
            email
            edad
        }
    }
`;
