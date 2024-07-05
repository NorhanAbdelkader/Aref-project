import { useState } from "react";
import './AddBookPage.css';
import Navbar from "../components/generalComponents/Navbar";
import { useAuth } from "../hooks/AuthProvider";
import { Link } from "react-router-dom";
import Sidebar from "../components/homeComponents/Sidebar";

const AddBookPage = () => {
    const [book, setBook] = useState({
        file: null,
        name: '',
        description: '',
        category: '',
        author: '',
        publisher: '',
        link: '',
    });

    const auth = useAuth();

    const categories = ['رواية', 'خيالي', 'علوم', 'واقعي', 'ديني', 'شعر'];

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setBook({ ...book, [name]: files[0] });
        } else {
            setBook({ ...book, [name]: value });
        }
    };

    const clearForm = () => {
        setBook(
            {
                file: null,
                name: '',
                description: '',
                category: '',
                author: '',
                publisher: '',
                link: '',
            }
        );
    };

    const handleSubmit = async (e) => {
        if (!book.file) {
            alert('يرجى رفع صورة الكتاب');
            return
        }
        e.preventDefault();
        console.log(book);

        try {

            const token = localStorage.getItem('auth-token');
            if (!token) {
                throw new Error('No auth token found in localStorage');
            }

            const formData = new FormData();
            formData.append('image', book.file);
            formData.append('name', book.name);
            formData.append('description', book.description);
            formData.append('category', book.category);
            formData.append('author', book.author);
            formData.append('publisher', book.publisher);
            formData.append('link', book.link);
            formData.append('price', 400);


            const response = await fetch(`http://localhost:5000/api/book/`, {
                method: 'POST',
                headers: {
                    'Authorization': token
                },

                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);
            clearForm();
            alert('تم إضافة الكتاب بنجاح');


        } catch (error) {
            console.error(error);
        }

    };

    if (!auth.user || auth.user.role !== "Admin") {
        return (
            <div className="erroe-message-admin">
                <p>
                    عذرا لا يمكنك الذهاب الي هذه الصفحة
                </p>
                <Link to="/">
                    <p className="back-to-landing">
                        العودة الي الصفحة الرئيسية
                    </p>
                </Link>

            </div>
        )
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="container-add-book">

                <div className="add-book-page">
                    <h2>إضافة كتاب جديد</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="file">صورة الكتاب:</label>
                            <div className="file-upload">
                                <input type="file" id="file" name="file" onChange={handleChange} />
                                <label htmlFor="file" className="file-label">
                                    <i className="fas fa-upload"></i>
                                </label>
                                {book.file && <span className="file-name">الصورة :  {book.file.name}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">عنوان / إسم الكتاب : </label>
                            <input type="text" id="name" name="name" value={book.name} onChange={handleChange} required="required" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">وصف الكتاب / نبذة مختصرة عنه : </label>
                            <textarea id="description" name="description" value={book.description} onChange={handleChange} required="required"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">نوع الكتاب : </label>
                            <select id="category" name="category" value={book.category} onChange={handleChange} required="required">
                                <option value="">اختر النوع</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">الكاتب : </label>
                            <input type="text" id="author" name="author" value={book.author} onChange={handleChange} required="required" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="publisher">دار النشر : </label>
                            <input type="text" id="publisher" name="publisher" value={book.publisher} onChange={handleChange} required="required" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="link">رابط الكتاب : </label>
                            <input type="text" id="link" name="link" value={book.link} onChange={handleChange}/>
                        </div>
                        <button type="submit" className="add-book">أضف الكتاب</button>
                    </form>
                </div>
            </div>

        </>
    );
};

export default AddBookPage;
