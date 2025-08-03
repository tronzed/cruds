import { useEffect, useState } from 'react'
import './App.css'

function App() {


  const [dataBox,setDataBox] = useState();


  const readbox = async ()=> {
    const res = await fetch('http://localhost:8000/users');
    const data = await res.json();
    setDataBox(data)
  }
  

  useEffect(() => {
    readbox();
  }, []);


  return (
    <>


      {  

        console.log(dataBox)

      }


      <form>
        <input type="text" placeholder='enter Name'/>
        <input type="text" placeholder='enter ID'/>
        <input type="text" placeholder='enter Role'/>
        <button>Delete</button>
      </form>

      <table>
        <thead>
          <th>Name</th>
          <th>ID</th>
          <th>Post</th>
          <th>Actions</th>
        </thead>
        <tbody>
          <tr>
            <td>Tanuj</td>
            <td>1</td>
            <td>Web Developer</td>
            <td><button>Edit</button><button className='delete'>Delete</button></td>
          </tr>
        </tbody>
      </table>


    </>
  )
}

export default App
