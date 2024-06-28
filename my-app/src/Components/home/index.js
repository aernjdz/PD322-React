import {useState} from "react";

const HomePage = () => {

    const [list, setList] = useState([
        {
            id: 1,
            image: "https://www.earth.com/_next/image/?url=https%3A%2F%2Fcff2.earth.com%2Fuploads%2F2023%2F08%2F26042949%2FNational-Dog-Day--960x640.jpg&w=3840&q=75",
            pib: "Марко Іван Васильович",
            telephone: "098 45 78 127",
            email: "ivan@gmail.com"
        },
        {
            id: 2,
            image: "https://people.com/thmb/Nm5TRrGO050Au3O7PSiHdt424vk=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(576x0:578x2)/Dog-Bitsy-050224-1-0717aedc49ba405aa2a1a8315cb57c51.jpg",
            pib: "Інь Янь",
            telephone: "098 45 70 127",
            email: "iniy@gmail.com"
        },
    ]);

    const handlerDelete = (id) => {
        //console.log("Delete item", id);
        setList(list.filter(x => x.id !== id));
    }

    const contentList = list.map(item =>
        <tr key={item.id}>
            <th scope="row">
                <div className={"d-flex justify-content-center"}>
                    <img
                        src={item.image}
                        alt="user"
                        style={{maxWidth: "75px", maxHeight: "50px"}}/>
                </div>
            </th>
            <td>{item.pib}</td>
            <td>{item.telephone}</td>
            <td>{item.email}</td>
            <td>
                <button className={"btn btn-danger"} onClick={() => handlerDelete(item.id)}>Delate</button>
            </td>
        </tr>
    );

    return (
        <>
            <h1 className={"text-center"}>Users</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Photo</th>
                    <th scope="col">Username</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {contentList}
                </tbody>
            </table>
        </>
    );
}

export default HomePage;