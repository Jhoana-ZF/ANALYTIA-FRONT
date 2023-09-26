import gql from "graphql-tag";

export const DELETE_USER = gql`
    mutation Mutation($deleteUserId: Int!) {
        deleteUser(id: $deleteUserId) {
            id
            nombre
            email
            edad
        }
    }
`;
