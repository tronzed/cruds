import { useEffect, useState } from 'react'
import './App.css'

function App() {


  const [id, setId] = useState();
  const [name, setname] = useState();
  const [post, setPost] = useState();
  const [readData, setReadData] = useState();

  const [editShow, setEditShow] = useState();

  const [editid, setEditId] = useState();
  const [editname, setEditname] = useState();
  const [editpost, setEditPost] = useState();
  const [editfirebaseid, setEditfirebaseid] = useState();


  // create Data
  function handleSubmit(e) {
    e.preventDefault();
    const data = { id, name, post };
    fetch('https://cruds-cdb8f-default-rtdb.firebaseio.com/users.json', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(() => {
      // nav("/index");
      read();
    })
  }

  // Update Data
  function handleEdit(e) {
    e.preventDefault();

    let fireid = editfirebaseid;
    let id = editid;
    let name = editname;
    let post = editpost;

    const data = { id, name, post };

    fetch(`https://cruds-cdb8f-default-rtdb.firebaseio.com/users/${fireid}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    read();

  }

  // Delete Data
  function handleDelete(id) {
    // e.preventDefault();
    fetch(`https://cruds-cdb8f-default-rtdb.firebaseio.com/users/${id}.json`, {
      method: 'DELETE'
    }).then(() => {
      // nav("/index"); 
      read();
    })
  }

  // Read the id and Data
  const readAsign = async (id) => {
    let res = await fetch(`https://cruds-cdb8f-default-rtdb.firebaseio.com/users/${id}.json`);
    let data = await res.json();
    setEditId(data['id']);
    setEditname(data['name']);
    setEditPost(data['post']);
    setEditfirebaseid(id)
  }

  // Read Data
  const read = async () => {
    let res = await fetch('https://cruds-cdb8f-default-rtdb.firebaseio.com/users.json');
    let data = await res.json();

    const usersArray = Object.entries(data).map(([key, value]) => ({
      firebaseId: key,
      ...value,
    }));

    setReadData(usersArray);
    console.log(usersArray);

  }


  useEffect(() => {
    read();
  }, []);

  return (
    <>

      <form className='flex items-center justify-center gap-2' onSubmit={handleSubmit}>
        <input className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='Enter Id' value={id} onChange={(e) => setId(e.target.value)} />
        <input className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" name='name' placeholder='enter Name' value={name} onChange={(e) => setname(e.target.value)} />
        <input className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" name='post' placeholder='enter post' value={post} onChange={(e) => setPost(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">Add</button>
      </form>


      {editShow && (

        <form className='updata_form justify-center flex items-center  gap-2' onSubmit={handleEdit}>

          <input type="hidden" name="firebaseId" value={editfirebaseid} />

          <input className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            type="text" placeholder='Enter Id' value={editid} onChange={(e) => setEditId(e.target.value)} />

          <input className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            type="text" name='name' placeholder='enter Name' value={editname} onChange={(e) => setEditname(e.target.value)} />

          <input className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            type="text" name='post' placeholder='enter post' value={editpost} onChange={(e) => setEditPost(e.target.value)} />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">Update</button>
        </form>

      )}

      <table className="table_box border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border border-gray-300">ID</th>
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th className="px-4 py-2 border border-gray-300">Post</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            readData?.map((item, index) => (
              <>
                <tr key={index} className="hover:bg-gray-100 transition duration-200">
                  <td className="px-4 py-2 border border-gray-300">{item.id}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.post}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button onClick={() => { setEditShow(true); readAsign(item.firebaseId); }} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Edit</button>
                    <button onClick={() => handleDelete(item.firebaseId)} className='bg-red-500 ml-5 text-white px-4 py-2 rounded hover:bg-red-600'>Delete</button>
                  </td>
                </tr>
              </>
            ))
          }
        </tbody>
      </table>


    </>
  )
}

export default App
