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


  // create Data
  function handleSubmit(e) {
    e.preventDefault();
    const data = { id, name, post };
    fetch('http://localhost:8000/users', {
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


    let id = editid;
    let name = editname;
    let post = editpost;


    const data = { id, name, post };

    fetch('http://localhost:8000/users/'+editid, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    read();

  }

  // Delete Data
  function handleDelete(id) {
    // e.preventDefault();
    fetch('http://localhost:8000/users/' + id, {
      method: 'DELETE'
    }).then(() => {
      // nav("/index"); 
      read();
    })
  }

  // Read Data
  const readAsign = async (id) => {
    let res = await fetch('http://localhost:8000/users/' + id);
    let data = await res.json();
    setEditId(data['id']);
    setEditname(data['name']);
    setEditPost(data['post']);
  }

  // Read the id and Data
  const read = async () => {
    let res = await fetch('http://localhost:8000/users');
    let data = await res.json();
    setReadData(data);
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
                    <button onClick={() => {setEditShow(true); readAsign(item.id);}} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Edit</button>
                    <button onClick={() => handleDelete(item.id)} className='bg-red-500 ml-5 text-white px-4 py-2 rounded hover:bg-red-600'>Delete</button>
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
