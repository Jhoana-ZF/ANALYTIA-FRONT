import gql from "graphql-tag";

export const CREATE_USER = gql`
    mutation CreateUser($nombre: String!, $email: String!, $edad: Int!) {
        createUser(nombre: $nombre, email: $email, edad: $edad) {
            id
            nombre
            email
            edad
        }
    }
`;
