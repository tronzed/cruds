import { useEffect, useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';

function App() {

  const nav = useNavigate();

  const [id, setId] = useState();
  const [name, setname] = useState();
  const [post, setPost] = useState();
  const [readData, setReadData] = useState();

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

    const data = { id, name, post };

    fetch('http://localhost:8000/users/3', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
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

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Id' value={id} onChange={(e) => setId(e.target.value)} />
        <input type="text" name='name' placeholder='enter Name' value={name} onChange={(e) => setname(e.target.value)} />
        <input type="text" name='post' placeholder='enter post' value={post} onChange={(e) => setPost(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <form className='updata_form' onSubmit={handleEdit}>
        <input type="text" placeholder='Enter Id' value={id} onChange={(e) => setId(e.target.value)} />
        <input type="text" name='name' placeholder='enter Name' value={name} onChange={(e) => setname(e.target.value)} />
        <input type="text" name='post' placeholder='enter post' value={post} onChange={(e) => setPost(e.target.value)} />
        <button type="submit">Update</button>
      </form>

      <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
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
                <tr className="hover:bg-gray-100 transition duration-200">
                  <td className="px-4 py-2 border border-gray-300">{item.id}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.post}</td>
                  <td className="px-4 py-2 border border-gray-300"><button>Edit</button><button onClick={() => handleDelete(item.id)} className='delete'>Delete</button></td>
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
