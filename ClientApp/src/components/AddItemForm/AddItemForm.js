import React, {  useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem,updateItem,deleteItem,alertManager } from '../../redux';
import Form, {
    ButtonItem,
    GroupItem,
    SimpleItem,
    RequiredRule,
    StringLengthRule,
    Label
} from 'devextreme-react/form';
import 'devextreme-react/autocomplete';
import ImageUploader from 'react-images-upload';
import './styles.css';
import initialState from '../../redux/initalStateForm';
import { alertActions } from '../../redux/alertActions/alertActions'
/** 
 * Adding item by form (Description,Image)
 * includes 4 methods:
 * 1.  onSelectedFilesChanged - attaches  selected file
 * 2.  handleSubmit - sends the form throught dispatch event
 * 3.  deleteItem -delets item throught dispatch event
 * 4.  clearForm-clear error messages and fields
 */
const AddItemForm = (props) => {
  
    const [dataForm, setDataForm] = useState({...props.currentData});
      
    //const [uploadedFileValid, setUploadedFileValid] = useState(false)
    const formElement = React.createRef();
    const formImageElement = React.createRef();

   const alertActionData = useSelector((state) =>state.alertManager);

   const alertType=alertActionData.type;
   const alertMessage=alertActionData.message;
  
 
    
    const dispatch = useDispatch()


    
    const deleteItemForm=(e)=>{
        if ( dataForm.itemData.Id !==0 ){
             dispatch && dispatch(deleteItem(dataForm.itemData));
        }
        clearForm();
    }
    const dateOptions = {  displayFormat:'dd/MM/yyyy' };
    
    const buttonAddUpdateOptions = {
        text: dataForm.itemData.Id===0 ? 'Add Item' :'Update Item' ,
        type: 'success',
        useSubmitBehavior: true,
    }
    const buttonDeleteOptions = {
        text: dataForm.itemData.Id>0 ? 'Delete Item' :'' ,
        type: 'success',
        onClick:deleteItemForm,
        useSubmitBehavior: false,
    }
    
    
    React.useEffect(() => {
        
        setDataForm(props.currentData);
    }, [props.currentData])
    const clearForm=()=>{
        if (formImageElement.current && formImageElement.current.state) {
            formImageElement.current.state.files = [];
            formImageElement.current.state.pictures = [];
        }
      
        setDataForm(initialState);  
        dispatch && dispatch(alertActions.clear);
      }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        if (dataForm.itemData.File) {
            formData.append('File', dataForm.itemData.File);
        }
        else{
            formData.append('ImageUrl', dataForm.itemData.ImageUrl);
        }
        formData.append('Id', dataForm.itemData.Id);
        formData.append('Name', dataForm.itemData.Name);
        formData.append('Description', dataForm.itemData.Description);
        formData.append('SaleStartDate', new Date(dataForm.itemData.SaleStartDate).toISOString());
        console.log(formData);
        if ( dataForm.itemData.Id === 0){
            dispatch && dispatch(addItem(formData));
        }
        else{
            dispatch && dispatch(updateItem(formData));
        }
        clearForm();
       
             
    }
    const onSelectedFilesChanged = async (e) => {
        let _fileImg = (e && e.length > 0) ? e[0] : null;
      
        let clonedformItem = Object.assign({}, dataForm);
        clonedformItem.itemData.File = _fileImg;
       // clonedformItem.uploadedFileValid = _fileImg ? true : false;

        setDataForm(clonedformItem);
        //setUploadedFileValid(_fileImg ? true : false);
    }
  


    return (
        <div className="main">
               <div className="container">
               {alertMessage &&
                            <div className={`alert ${alertType}`}>{alertMessage}</div>
                        }
                 
                <div>
            <h5>Item Data  </h5>
                    <form
                        action="ulpoad-item"
                        ref={formElement}
                        onSubmit={handleSubmit}
                    >
                        <Form
                            formData={dataForm.itemData}
                            readOnly={false}
                            showColonAfterLabel={true}
                            showValidationSummary={true}
                        >
                             <GroupItem>
                                <SimpleItem dataField="Id" readOnly={true}  visible={dataForm.itemData.Id>0} > 
                                <Label text="Code" />
                                </SimpleItem>
                            </GroupItem>
                             <GroupItem>
                                <SimpleItem dataField="Name">
                                    <RequiredRule message="Name is required" />
                                    <StringLengthRule min={2} message="Name must have at least 2 symbols" />
                                    <StringLengthRule max={100} message="Name must be maximum length of 100symbols" />
                                </SimpleItem>
                            </GroupItem>
                            <GroupItem>
                                <SimpleItem dataField="Description">
                                    <RequiredRule message="Description is required" />
                                    <StringLengthRule min={2} message="Description must have at least 2 symbols" />
                                    <StringLengthRule max={100} message="Description must be maximum length of 100symbols" />
                                </SimpleItem>
                            </GroupItem>
                            <GroupItem>
                                <SimpleItem dataField="SaleStartDate" editorType="dxDateBox"editorOptions={dateOptions} >
                                    <RequiredRule message="SaleStartDate is required" /> 
                                </SimpleItem>
                            </GroupItem>
                            <GroupItem>
                                {/* {!uploadedFileValid && (<span className="imageUploadErr">* Image file is required</span>)} */}

                                <ImageUploader ref={formImageElement}
                                    withIcon={false}
                                    withPreview={true}
                                    singleImage={true}
                                    label=""
                                    errorClass="imageUploadErr"
                                    buttonText="Browse Images"
                                    onChange={onSelectedFilesChanged}
                                    imgExtension={[
                                        '.jpg',
                                        '.gif',
                                        '.png',
                                        '.gif',
                                        '.svg',
                                    ]}
                                    maxFileSize={5242880}
                                    fileSizeError=" file size is too big"
                                />
                                <span className="note">
                                    {'Maximum file size: '}
                                    <span>5242880</span>
                                    {'.'}
                                </span>

                            </GroupItem>
                            <GroupItem colCount={2}> 
                           
                            <ButtonItem  cssClass="smallBtn"
                                alignment ="left"  
                                buttonOptions={buttonAddUpdateOptions}
                            />
                             
                             <ButtonItem  cssClass="smallBtn"
                                alignment ="right"
                                buttonOptions={buttonDeleteOptions} 
                                visible={dataForm.itemData.Id>0}
                            /> 
                                
                            </GroupItem>
                        </Form>
                    </form>

                </div>
              
            </div>
        </div>
    );

}
export default AddItemForm; 