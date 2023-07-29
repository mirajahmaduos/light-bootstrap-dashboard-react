import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';
import {FaEdit, FaTrash} from 'react-icons/fa';

// import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function Category() {
  const [data, setData] = useState([]); //used in get request to set the returned data
  const [formData, setFormData] = useState({category: ''}); //used in post/put request to set data
  const formRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false); //will update/set to true in editCategory
  const [editItemId, setEditItemId] = useState(null); //track the item being edited. will set in editCategory

  useEffect(() => {
    const fetchData = async () => {
      const configuration = {
        method: 'get',
        url: 'http://localhost:3001/category/get-all-categories',
      }
      try{
         const result = await axios(configuration);
         console.log('categories ', result);
         if(result.status === 200){
          setData(result.data.data);
         }
         console.log('data', data);
      }catch(err){
        console.log('error in fetching data',err);
      }
    }
    fetchData();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if(document.getElementById('category').value === ''){
      return alert('Empty data cannot be added!');
    }
    console.log('category',formData);
    if(isEditMode){ //if edit mode on/true and edit id available that means editing/updating
      const configuration = {
        method : 'put',
        url: 'http://localhost:3001/category/update-category/'+editItemId,
        data: formData,
      }
      axios(configuration)
      .then((result) => {
        console.log('udpated', result);
        if(result.status === 200){
          alert('Category updated Successfully');
          setIsEditMode(false);
          setEditItemId(null);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log('error in updating category', err);
        alert(`error in updating category`, err);
      })
    }else{ //adding category / create/submit category
      const configurations = {
        method: 'post',
        url: 'http://localhost:3001/category/create-category',
        data: formData,
      }
      axios(configurations)
      .then((result) => {
        if(result.status === 200){
          alert('Category Added Successfully');
          setFormData({category: ''}); 
          // document.getElementsById('category').value = '';
          // form.reset();
          // clearData();
          // formRef.current.reset();
          window.location.reload();
        }
      })
      .catch((err) => {
        alert('Error in adding Category. see the console for details', err);
        console.log('error in adding category', err);
      });
    }
    
  };
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({...prevData, [name]: value,}));
  };
  const clearData = async () => {
    // document.getElementById('category').value = '';
    formRef.current['catForm'].value = '';
  }
  const deleteCategory = (id) => {
    const confirmation = window.confirm('Are you sure to delete?');
    console.log('confirmation delete', confirmation);
    if(confirmation){
      const configuration = {
        url : 'http://localhost:3001/category/delete-category/'+id,
        method : 'delete',
      }
      axios(configuration)
      .then((result) => {
        if(result.status === 200){
          // alert('Category deleted successfully');
          window.location.reload();
        }
      })
      .catch((err) => {
        alert('error in deleting category');
        console.log('error in deleting category', err);
      })
    }
    
  };
  const editCategory = (id, category) => {
    //find category by id in data(which is returned from get request in useEffect) and set the editMode & editId
    console.log('id ', id);
    const categoryToEdit = data.find((item) => item._id === id);
    console.log('category to edit', categoryToEdit);
    if(categoryToEdit){
      //set the form in edit mode
      setIsEditMode(true);
      setEditItemId(id);
      //populate the form field with selected category
      setFormData({category: categoryToEdit.category});
    }
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={2}></Col>
          <Col md={6} offset={{md:2}}>
            <h4>Create Category</h4>
            <Form method="post" enctype='multipart/form-data' onSubmit={handleSubmit}>
              <Form.Group controlId="catForm">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" name="category" value={formData.category} id="category" placeholder="Enter Category Name" onChange={handleChange} />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                {isEditMode ? "Update" : "Add"}
              </Button>
            </Form>
          </Col>
          {/* <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Number</p>
                      <Card.Title as="h4">150GB</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col> */}
          {/* <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <Card.Title as="h4">$ 1,345</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
                </div>
              </Card.Footer>
            </Card>
          </Col> */}
          
        </Row>
        <Row className="mt-3">
          <Col md={2}></Col>
          <Col md="6">
              <Table striped hover bordered>
                <thead className="" style={{color:'black'}}>
                  <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  data.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index+1}</td>
                      <td>{item.category}</td>
                      <td>
                        <FaEdit style={{cursor:'hand', marginRight:'15px'}} onClick={() => editCategory(item._id, item.category)} />
                        <FaTrash style={{cursor: 'hand'}} onClick={() => deleteCategory(item._id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
          </Col>
        </Row>
        
      </Container>
    </>
  );
}

export default Category;
