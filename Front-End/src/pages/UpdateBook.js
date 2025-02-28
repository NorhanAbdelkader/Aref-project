import './updatebook.css'
import{useState,useEffect} from 'react'
import {useParams} from 'react-router'
import { useNavigate } from "react-router-dom";
import Navbar from'../components/generalComponents/Navbar'
import Sidebar from'../components/homeComponents/Sidebar'
import { FcEditImage } from "react-icons/fc";
import { Link } from "react-router-dom";
export default function UpdateBooks() {
    const navigate=useNavigate()
    const [isDeleted,setIsDeleted] =useState(false)
    const [bookDetail, setBookDetail] = useState({
        file: null,
        name: '',
        description: '',
        category: '',
        author: '',
        publisher: '',
        price: '',
        link:''
    });
    useEffect(() => {
        fetchData()
    }, []);
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/book/${id}`)
            if (!response.ok) { console.log("Network Error") }
            const fetchedData = await response.json();
             setBookDetail(fetchedData.book)
        }
        catch (error) {
            console.log("Error fetching data", error)

        }}
  

    const handleSubmit= async(e)=>{


        const formData = new FormData();
        formData.append('image', bookDetail.image);
        formData.append('file', bookDetail.file);
        formData.append('name', bookDetail.name);
        formData.append('description', bookDetail.description);
        formData.append('category', bookDetail.category);
        formData.append('author', bookDetail.author);
        formData.append('publisher', bookDetail.publisher);
        formData.append('link', bookDetail.link);
        formData.append('price', bookDetail.price);

    
        try {
            console.log("to",bookDetail)
          
            const response = await fetch(`http://localhost:5000/api/book/${id}`,
                {
                    method:'PUT',
    
                    body: formData
                    });
            console.log("to",bookDetail,response)
    
            if (!response.ok) {  throw new Error(`HTTP error! status: ${response.status}`);}
         
            const data = await response.json();
            console.log("res",data)
            if(!data.error)
             alert("تم التعديل :)") 
            else{
                console.log(data.error)
            alert("حدث خطأ ما حاول ثانيةً:(") 
 }
        }
        catch (error) {
            console.log("Error fetching data", error)

        }
    }
    const handleChange=(e)=>{
        let name =e.target.name;
        let value=e.target.value;
        if (name === 'file') {
            setBookDetail({ ...bookDetail, image: e.target.files[0] });
          } else
        setBookDetail(
          {  ...bookDetail,
            [name]:value}
        )
    }
    const handleDelete = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/book/${id}`, {
            method: 'DELETE',
          });
    
          if (!response.ok) {
            throw new Error('Failed to delete book');
          }
    
          const data = await response.json();
          alert('Book deleted successfully');
          setIsDeleted(true)
        } catch (error) {
          console.error('Error deleting book:', error);
          alert('Failed to delete book');
        }
      };
    const { id } = useParams();
   
        if(isDeleted) return navigate("/library");;
        return (<>
          <Navbar/>
             <Sidebar/>

           <div className='container-update-book'>

                <div className="image-container">
                    <img src={bookDetail.image} alt={bookDetail.image} />
                </div>
                <div className='form' onSubmit={handleSubmit}>
                <div className='field file-upload'>
                <label htmlFor="file"><FcEditImage size={35} color='#014D4E'/></label>
        
                                <input type="file" id="file" name="file" onChange={handleChange} />
                                <label htmlFor="file" className="file-label">
                                    <i className="fas fa-upload"></i>
                                </label>
                </div>

                <div className='field'>
                    <label><h3> اسم الكتاب</h3></label>
                    <input type='text' name="name" placeholder={bookDetail.name} value={bookDetail.name}onChange={handleChange} />
                </div>

                <div className='field'>
                    <label><h3> الوصف</h3></label>
                    <textarea type='text'name="description" placeholder={bookDetail.description} value={bookDetail.description} onChange={handleChange} className='description' ></textarea>
                </div>

                <div className='field'>
                    <label><h3> نوع الأدب</h3></label>
                    <input type='text'name="category" placeholder={bookDetail.category} value={bookDetail.category} onChange={handleChange} className='category' />
                </div>

                <div className='field'>
                    <label><h3> اسم الكاتب</h3></label>
                    <input type='text'name="author" placeholder={bookDetail.author} value={bookDetail.author} onChange={handleChange} className='content' />
                </div>

                <div className='field'>
                    <label><h3> دار النشر</h3></label>
                    <input type='text'name="publisher"placeholder={bookDetail.publisher} value={bookDetail.publisher} onChange={handleChange} className='content' />
                </div>

                <div className='field'>
                    <label><h3> السعر</h3></label>
                    <input type='text'name="price" placeholder={bookDetail.price} value={bookDetail.price} onChange={handleChange} className='content' />
                </div>
                
                <div className='field'>
                <label htmlFor="link"><h3> رابط الكتاب</h3> </label>
                <input type="text" id="link" name="link" value={bookDetail.link} onChange={handleChange}/>
                         </div>
                <div className='field'>
                <button type='submit' className='submit-button'onClick={handleSubmit}>حفظ التعديلات</button>
                </div>
            </div>
            <div className='field'>
                <button className='delete'onClick={handleDelete}>حذف من المكتبة</button>
                </div>
            </div>
            </>
        )
    }
    