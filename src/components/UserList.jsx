import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import AddIcon from "../icons/AddIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import Modal from "./Modal";
import Input from "./Input";
import { GET_USERS } from "../../graphql/getUsers";
import { CREATE_USER } from "../../graphql/createUser";
import { DELETE_USER } from "../../graphql/deleteUser";
import { UPDATE_USER } from "../../graphql/updateUser";

function UserList() {
    const { data, refetch } = useQuery(GET_USERS);
    const [createUser] = useMutation(CREATE_USER);
    const [deleteUser] = useMutation(DELETE_USER);
    const [updateUser] = useMutation(UPDATE_USER);
    const [userSelected, setUserSelected] = useState("");
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [edad, setEdad] = useState("");

    const users = data?.users;

    const handleCreateOpenModal = () => {
        setIsModalCreateOpen(true);
    };

    const handleCreateCloseModal = () => {
        setIsModalCreateOpen(false);
    };

    const handleDeleteOpenModal = (id) => {
        setUserSelected(id);
        setIsModalDeleteOpen(true);
    };

    const handleDeleteCloseModal = () => {
        setUserSelected("");
        setIsModalDeleteOpen(false);
    };

    const handleUpdateOpenModal = (users) => {
        setUserSelected(users.id);
        setNombre(users?.nombre);
        setEmail(String(users?.email));
        setEdad(users?.edad);
        setIsModalUpdateOpen(true);
    };

    const handleUpdateCloseModal = () => {
        setUserSelected("");
        setNombre("");
        setEmail("");
        setEdad("");
        setIsModalUpdateOpen(false);
    };

    const hanldeSubmitCreate = async (e) => {
        e.preventDefault();

        try {
            const { data } = await createUser({
                variables: {
                    nombre: nombre,
                    email: email,
                    edad: parseInt(edad),
                },
            });
            refetch();
            const newUser = data.createUser;

            console.log("Usuario creado:", newUser);

            handleCreateCloseModal();
            setNombre("");
            setEmail("");
            setEdad("");
        } catch (error) {
            console.error("Error al crear usuario:", error);
        }
    };

    const handleDeleteUsuario = async () => {
        try {
            await deleteUser({
                variables: {
                    deleteUserId: userSelected,
                },
            });
            refetch();

            console.log("Usuario eliminado");

            handleDeleteCloseModal();
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    const hanldeSubmitUpdate = async () => {
        try {
            const { data } = await updateUser({
                variables: {
                    updateUserId: userSelected,
                    nombre: nombre,
                    email: email,
                    edad: parseInt(edad),
                },
            });
            refetch();

            const updatedUser = data.updateUser;

            console.log("Usuario actualizado:", updatedUser);

            handleUpdateCloseModal();
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };
    return (
        <>
            <section className="flex h-screen">
                <article className="flex-1 pt-[92px] pb-10 px-[122px] overflow-auto">
                    <button
                        className="flex bg-[#C4C4C4] h-10 rounded-xl gap-2 items-center font-roboto text-xl pr-[25px] pl-4"
                        onClick={handleCreateOpenModal}
                    >
                        <AddIcon />
                        Crear usuario
                    </button>
                    <div className="mx-auto  pt-7">
                        <table className="min-w-full border-collapse">
                            <thead className="py-2">
                                <tr className="text-white py-2">
                                    <th className="bg-black py-2 px-5 rounded-tl-2xl">N°</th>
                                    <th className="bg-black py-2 px-5">Nombre</th>
                                    <th className="bg-black py-2 px-5">Email</th>
                                    <th className="bg-black py-2 px-5">Edad</th>
                                    <th className="bg-black py-2 px-5 rounded-tr-2xl">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((item, index) => (
                                    <tr className="border" key={item?.id}>
                                        <td className="py-2 px-5 text-center">{index + 1}</td>
                                        <td className="py-2 px-5 text-center">{item?.nombre}</td>
                                        <td className="py-2 px-5 text-center">{item?.email}</td>
                                        <td className="py-2 px-5 text-center">{item?.edad}</td>

                                        <td className="py-2 px-5 flex gap-3 justify-center">
                                            <EditIcon className="cursor-pointer" onClick={() => handleUpdateOpenModal(item)} />
                                            <DeleteIcon className="cursor-pointer" onClick={() => handleDeleteOpenModal(item?.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </article>
            </section>

            {/* Modal para crear*/}
            <Modal isOpen={isModalCreateOpen} onClose={handleCreateCloseModal} maxWidth="520px">
                <div>
                    <div className="px-5">
                        <h2 className="text-4xl font-bold mb-10 text-center">Crear nuevo usuario </h2>
                        <form onSubmit={hanldeSubmitCreate} className="w-full">
                            <Input label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Input label="Edad" value={edad} onChange={(e) => setEdad(e.target.value)} />

                            <div className="flex justify-center mt-10">
                                <button type="submit" className="bg-brown text-white font-bold py-2 px-4 rounded border-2 border-brown">
                                    Añadir
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

            {/* Modal para actualizar*/}
            <Modal isOpen={isModalUpdateOpen} onClose={handleUpdateCloseModal} maxWidth="520px">
                <div className="px-5">
                    <h2 className="text-4xl font-bold mb-10 text-center">Actualizar Usuario</h2>
                    <form onSubmit={hanldeSubmitUpdate} className="w-full">
                        <Input label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input label="Edad" value={edad} onChange={(e) => setEdad(e.target.value)} />
                        <div className="flex justify-center mt-10">
                            <button type="submit" className="bg-brown text-white font-bold py-2 px-4 rounded border-2 border-brown">
                                Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Modal para eliminar*/}
            <Modal isOpen={isModalDeleteOpen} onClose={handleDeleteCloseModal}>
                <h2 className="text-2xl font-bold mb-2">Usuario </h2>
                <p>¿Estas seguro que quieres eliminar este usuario?</p>
                <div className="flex justify-end gap-2 mt-3">
                    <button className="bg-brown text-white font-bold py-2 px-4 rounded border-2 border-brown" onClick={() => handleDeleteUsuario()}>
                        Aceptar
                    </button>
                    <button className="border-brown border-2 text-brown font-bold py-2 px-4 rounded" onClick={handleDeleteCloseModal}>
                        Rechazar
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default UserList;
