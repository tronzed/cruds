import { useEffect, useState } from 'react'
import './App.css'

function App() {

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
    })
  }

  // Update Data
  function handleEdit(e){
    e.preventDefault();

    const data = { id, name, post };

    fetch('http://localhost:8000/users/3',{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(data)
    });
  }

  // Delete Data
  function handleDelete(id){
    // e.preventDefault();
    fetch('http://localhost:8000/users/'+id,{
      method:'DELETE'
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

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Post</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {

            readData?.map((item, index) => (
              <>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.post}</td>
                  <td><button>Edit</button><button onClick={()=>handleDelete(item.id)} className='delete'>Delete</button></td>
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
