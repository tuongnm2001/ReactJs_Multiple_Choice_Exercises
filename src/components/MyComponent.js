import { useState, useRef, useEffect } from "react";

const MyConponent = () => {
    let user = [
        {
            id: '1',
            name: 'Nguyen Van A',
            age: 22,
        },
        {
            id: '2',
            name: 'Nguyen Van B',
            age: 18,
        },
        {
            id: '3',
            name: 'Nguyen Van C',
            age: 30,
        },
    ]
    const textInput = useRef(null);

    const [listUser, setListUser] = useState(user)
    const [show, setShow] = useState(true)
    const [name, setName] = useState('')
    const [age, setAge] = useState('')

    const handleClickShowHide = () => {
        setShow(!show)
    }

    const handleSubmit = (e) => {
        setListUser([...listUser, { name, age }])
        setName('')
        setAge('')
        textInput.current?.focus();
    }

    const handleDelete = (userId) => {
        let listUserClone = [...listUser];
        listUserClone = listUserClone.filter(asdsdasd => asdsdasd.id !== userId);
        setListUser(listUserClone)
    }

    useEffect(() => {
        console.log('hello');
    }, [])

    return (
        <>
            <div>
                <input ref={textInput} placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder="age" value={age} onChange={(e) => setAge(e.target.value)} />
                <button onClick={() => handleSubmit()}>Submit</button>
            </div>
            {
                show === true ?
                    listUser && listUser.length > 0 &&
                    listUser.map((item, index) => {
                        return (
                            <ul key={`index-${index}`}>
                                <li>{item.id}</li>
                                <li>{item.name}</li>
                                <li>{item.age}</li>
                                <button style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.id)}>x</button>
                            </ul>
                        )
                    })
                    :
                    ""
            }
            <div style={{ marginLeft: "20%", position: "relative" }}>
                <button style={{ position: "relative" }} onClick={() => handleClickShowHide()}>{show ? "Hide" : "Show"}</button>
            </div>
        </>
    );
}

export default MyConponent;