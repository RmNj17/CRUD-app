import { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function App ()
{
  const [ studentData, setStudentData ] = useState( {} );
  const [ students, setStudents ] = useState( [] );
  const [ editMode, setEditMode ] = useState( false );
  const [ editStudentId, setEditStudentId ] = useState( null );

  const handleChange = ( e ) =>
  {
    const { name, value } = e.target;
    setStudentData( ( prevData ) => ( {
      ...prevData,
      [ name ]: value,
    } ) );
  };

  const handleSubmit = ( e ) =>
  {
    e.preventDefault();
    if ( editMode )
    {
      const updatedStudents = students.map( ( student ) =>
      {
        if ( student.id === editStudentId )
        {
          return { ...student, ...studentData };
        }
        return student;
      } );
      setStudents( updatedStudents );
      setEditMode( false );
      setEditStudentId( null );
    } else
    {
      const newStudent = { ...studentData, id: Date.now() };
      setStudents( ( prevStudents ) => [ ...prevStudents, newStudent ] );
    }
    setStudentData( {} );
  };

  const handleEdit = ( studentId ) =>
  {
    const studentToEdit = students.find( ( student ) => student.id === studentId );
    if ( studentToEdit )
    {
      setStudentData( studentToEdit );
      setEditMode( true );
      setEditStudentId( studentId );
    }
  };

  const handleDelete = ( studentId ) =>
  {
    const updatedStudents = students.filter( ( student ) => student.id !== studentId );
    setStudents( updatedStudents );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8"><span className="text-red-400">Student Information</span></h1>
        <form onSubmit={ handleSubmit } className="mb-8">
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="text-lg text-gray-800 mb-2">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter student name"
              required
              value={ studentData.name || '' }
              onChange={ handleChange }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="age" className="text-lg text-gray-800 mb-2">Age</label>
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Enter student age"
              required
              value={ studentData.age || '' }
              onChange={ handleChange }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="address" className="text-lg text-gray-800 mb-2">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter student address"
              required
              value={ studentData.address || '' }
              onChange={ handleChange }
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            { editMode ? 'Update student' : 'Add student' }
          </button>
        </form>
        <TransitionGroup className="mb-4">
          { students.map( ( student ) => (
            <CSSTransition key={ student.id } timeout={ 500 } classNames="fade">
              <div className="bg-white shadow-md rounded-md p-4 mb-4 flex justify-between items-center">
                <div>
                  <p className="text-lg text-gray-800">Name: { student.name }</p>
                  <p className="text-lg text-gray-800">Age: { student.age }</p>
                  <p className="text-lg text-gray-800">Address: { student.address }</p>
                </div>
                <div>
                  <button
                    onClick={ () => handleEdit( student.id ) }
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={ () => handleDelete( student.id ) }
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </CSSTransition>
          ) ) }
        </TransitionGroup>
      </div>
    </div>
  );
}

export default App;
