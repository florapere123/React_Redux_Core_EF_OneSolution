import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchItems } from '../../redux'
import { Button } from 'devextreme-react'
import DataGrid, { Column, Pager, Paging, RowDragging, Sorting ,FilterRow,HeaderFilter,SearchPanel} from 'devextreme-react/data-grid'
import { LoadIndicator } from 'devextreme-react/load-indicator';
import { appConfig } from '../../Config';
import  initialState  from  '../../redux/initalStateForm';
import './styles.css'

/** 
 * gets the list of items 
 * includes  4  methods:
 * 1.  onReorder - enables to reorder grid items
 * 2.  cellRender - renders image cell in the grid
 * 3.  createImgPath -regex to make the img path valid
 * 4. onAddNewItem - adds structure from initoalStAte for new item
 */
const ItemsList = (props) => {
    const itemsData = useSelector((state) => state.itemList);
    const dispatch = useDispatch();
     
    const boilerplateItem = {...initialState.itemData};
   
    useEffect(() => {
        getAllItems();
    }, [])

    const onReorder = (e) => {
        let visibleRows = e.component.getVisibleRows(),
            toIndex = itemsData.items.indexOf(visibleRows[e.toIndex].data),
            fromIndex = itemsData.items.indexOf(e.itemData);

        itemsData.items.splice(fromIndex, 1);
        itemsData.items.splice(toIndex, 0, e.itemData);

        e.component.refresh();
    }
    const cellRender = (data) => {
        let imageUrl =
            data && data.data ? createImgPath(data.data.ImageUrl) : '';
        return imageUrl ? (
            <img src={imageUrl} className="imgItem" alt="text" />
        ) : (
                'No image'
            )
    }
    const getAllItems = () => {
        dispatch(fetchItems());
    }
    const onAddNewItem = () => {
        props.selectedRow(boilerplateItem);
    }
    const onSelectionChanged = ({ selectedRowsData }) => {
        if (selectedRowsData && selectedRowsData.length > 0) {
            const data = selectedRowsData[0];
            console.log(data);
            props.selectedRow(data);

        }
    }


    const createImgPath = (serverPath) => {
        let  url='';
        if (serverPath!=null){
            let convertedServerPath = serverPath.replace(/\\/g, '/');
              url = `${appConfig.ROOT_PATH_SERVER}${convertedServerPath}`; 
        }
      
        return url;
    }
    return itemsData.loading ? (
        <LoadIndicator id="image-indicator" height={200} width={200} indicatorSrc="https://fc06.deviantart.net/fs71/f/2013/073/4/1/loading_circle_fully_working_by_assasinna-d5xfzgb.gif" />
    ) : itemsData.error ? (
        <h2>{itemsData.error}</h2>
    ) : (
                <div>
                    <h5>Items List</h5>
                    <div>
                        {itemsData && itemsData.items && (

                            <>
                                <Button
                                    width={120}
                                    text="Add new item +"
                                    type="default"
                                    stylingMode="contained"
                                    onClick={onAddNewItem}
                                />
                                <DataGrid
                                    id="gridContainer"
                                    dataSource={itemsData.items}
                                    showBorders={true}
                                    selection={{ mode: 'single' }}
                                    keyExpr="Id"
                                    onSelectionChanged={onSelectionChanged}
                                >
                                    <Sorting mode="single" />
                                    <HeaderFilter visible={true} />
                                    <FilterRow visible={true} applyFilter= 'auto' />
                                    <RowDragging
                                        allowReordering={true}
                                        onReorder={onReorder}
                                        showDragIcons={true}
                                    />
                                    <Paging defaultPageSize={5} />
                                    <Pager
                                        showPageSizeSelector={true}
                                        allowedPageSizes={[5, 10, 20]}
                                        showInfo={true} />
                                    <SearchPanel visible={true}
                                    width={240}
                                    placeholder="Search..." />
                                    <Column
                                        dataField="Id"
                                        width={130}
                                        height={130}
                                        align="center"
                                        allowSorting={true}
                                        caption="Code"
                                    />

                                    <Column
                                        dataField="Name"
                                        allowSorting={true}
                                        max-width={300}
                                        caption="Name"
                                    />
                                    <Column
                                        dataField="Description"
                                        allowSorting={true}
                                        max-width={300}
                                        caption="Description"
                                    />
                                    <Column
                                        dataField="SaleStartDate"
                                        allowSorting={true}
                                        max-width={300}
                                        dataType="date"
                                        caption="SaleStartDate"
                                    />
                                    <Column
                                        dataField="ImageUrl"
                                        width={130}
                                        height={130}
                                        align="center"
                                        allowSorting={false}
                                        cellRender={cellRender}
                                    />
                                </DataGrid>
                                <Button
                                    width={120}
                                    text="Load All"
                                    type="default"
                                    stylingMode="contained"
                                    onClick={getAllItems}
                                />
                            </>
                        )}
                    </div>
                </div>
            )
}

export default ItemsList
