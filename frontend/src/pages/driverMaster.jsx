import { Card, CardContent, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner';
import { ClassicSpinner, MetroSpinner } from 'react-spinners-kit';
import { Table, Pagination, SelectPicker } from 'rsuite';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { deleteDriver, readAllDriver } from '@/hooks/useDriver';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
const { Column, HeaderCell, Cell } = Table;

const DriverMaster = () => {

  const { readAllLoading, getReadAll, readAllMessage, readAllData } = readAllDriver();
  const { deleteLoading, getDelete, deleteMessage, deleteData } = deleteDriver()

  useEffect(() => {
    const fetchData = async () => {
      await getReadAll();
      console.log('read all data:', readAllMessage, readAllData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (readAllMessage && readAllMessage.includes('Successful')) {
      { toast.success(readAllMessage) }
    } else if (readAllMessage) {
      { toast.error(readAllMessage); }
    }
    if (deleteMessage && deleteMessage.includes('successful')) {
      { toast.success(deleteMessage) }
    } else if (deleteMessage) {
      { toast.error(deleteMessage); }
    }
  }, [readAllMessage, deleteMessage]);

  const handleDelete = async (name) => {
    getDelete({ name: name });
  };

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [bordered, setBordered] = useState(true);
  const [hover, setHover] = useState(true);

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const masterData = readAllData ? readAllData.drivers : null;

  let tableData;
  if (masterData) {
    tableData = masterData.filter((v, i) => {
      const start = limit * (page - 1);
      const end = start + limit;
      return i >= start && i < end;
    });
  }

  const navigate = useNavigate();
  const navigateWithState = () => {
    navigate('/home', { state: { initialView: 'vehiclemaster' } });
  };

  return (
    <div>
      <div className='flex'>
        <div className='flex flex-col'>
          <div className='text-3xl text-black mt-12 ml-8 font-semibold'>
            <Toaster richColors position="top-center" />
            Driver Master
          </div>
          <div className='text-lg text-black mt-1 ml-8'>
            Here is the list of all Driver details
          </div>
        </div>
        <div className='flex justify-end mt-12 mr-8 flex-grow'>
          <Button className='mb-20 mr-10' onClick={navigateWithState}>Go Back</Button>
        </div>
      </div>
      {
        !readAllLoading ? (

          (masterData && tableData ? (
            <div className='mt-6 ml-5  mr-5'>
              <Table
                height={400}
                data={tableData}
                hover={hover}
                bordered={bordered}
                cellBordered={bordered}
                color='black'
              >
                <Column align="center" flexGrow={1} minWidth={50}>
                  <HeaderCell className='text-base text-black font-semibold'>Staff ID</HeaderCell>
                  <Cell className='text-slate-950' dataKey="staff_id" />
                </Column>
                <Column align="center" flexGrow={1} minWidth={250}>
                  <HeaderCell className='text-base text-black font-semibold'>Driver Name</HeaderCell>
                  <Cell className='text-slate-950' dataKey="name" />
                </Column>
                <Column align="center" flexGrow={1} minWidth={250}>
                  <HeaderCell className='text-base text-black font-semibold'>mappings</HeaderCell>
                  <Cell className='text-slate-950' dataKey="mapped">
                    {rowData => rowData.mapped ? 'Yes' : 'No'}
                  </Cell>
                </Column>
                <Column align='center' flexGrow={2} minWidth={250}>
                  <HeaderCell flexGrow={2} className='text-base text-black font-semibold'>Action</HeaderCell>
                  <Cell>
                    {rowData => {
                      return (
                        <div className="flex items-center justify-center -mt-2">
                          <Dialog>
                            <DialogTrigger className="flex items-center" onClick={(e) => e.stopPropagation()}>
                              <Button className='h-9 mx-2'>View</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]" open>
                              <DialogHeader onClick={(e) => e.stopPropagation()}>
                                <DialogTitle className='text-2xl text-black flex items-center justify-center'>Driver Details</DialogTitle>
                                <DialogDescription>
                                  Make sure to verify all details here. Go to edit to Change it
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <Label className="text-right text-xl text-black font-bold" >
                                  Staff ID:
                                </Label>
                                <Label className='text-base text-black'>
                                  {rowData.staff_id}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                  Driver Name:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.name}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                  Contact:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.contact}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                  Driving License:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.dl}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                Driving License number:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.dl_no}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                  Driving License Expiry:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.dl_exp}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                  Driving License Type:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.dl_type}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                  Mapping:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.mapped ? 'Done' : 'Not Yet'}
                                </Label>
                              </div>
                              <DialogFooter>
                                <DialogClose>
                                  <Button className='items-start' >Close</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Button className='h-9 mx-2'>Edit</Button>
                          <Button
                            className='h-9 mx-2'
                            onClick={() => {
                              handleDelete(rowData.name)
                            }}>{deleteLoading ? <ClassicSpinner /> : 'Delete'}
                          </Button>
                        </div>
                      );
                    }}
                  </Cell>
                </Column>
              </Table>
              <div className="flex justify-center mt-4">
                <Link to='/driver/create'>
                  <Button>
                    Create Driver
                  </Button>
                </Link>
              </div>
              <div style={{ padding: 20 }}>
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  maxButtons={5}
                  size="md"
                  layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                  total={tableData.length}
                  limitOptions={[10, 30, 50]}
                  limit={limit}
                  activePage={page}
                  onChangePage={setPage}
                  onChangeLimit={handleChangeLimit}
                />
              </div>
            </div>
          ) : <Card className='mt-10 mx-20 h-[200px] flex items-center justify-center'>
            <CardContent>
              <CardTitle className='text-xl font-medium text-slate-800'>
                No Data available
              </CardTitle>
            </CardContent>
          </Card>
          )

        ) :
          <div className='flex items-center justify-center mt-40'>
            <MetroSpinner size={50} color="#000" loading={true} />
          </div>
      }

    </div>
  )
}

export default DriverMaster
