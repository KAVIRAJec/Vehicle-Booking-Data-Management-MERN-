import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { readAllVehicleDriver } from '@/hooks/useVehicleDriver';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { MetroSpinner } from 'react-spinners-kit';
import { Table, Pagination, SelectPicker } from 'rsuite';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
const { Column, HeaderCell, Cell } = Table;

const DriverMaster = () => {

  const { loading, readAllData, errorMessage, data } = readAllVehicleDriver();

  useEffect(() => {
    const fetchData = async () => {
      await readAllData();
      console.log('read all data:', errorMessage, data);
      showToast();
    };
    fetchData();
  }, []);

  const showToast = () => {
    if (!data) {
      { toast.error(errorMessage) }
    }
  }

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [bordered, setBordered] = useState(true);
  const [hover, setHover] = useState(true);

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const masterData = data ? data.mappings : null;

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
        !loading ? (

          (masterData && tableData ? (
            <div className='mt-6 ml-5  mr-5'>
              <Table
                data={tableData}
                hover={hover}
                bordered={bordered}
                cellBordered={bordered}
                color='black'
              >
                <Column align="center" flexGrow={1} minWidth={100}>
                  <HeaderCell className='text-base text-black font-semibold'>Driver Name</HeaderCell>
                  <Cell className='text-slate-950' dataKey="driver_name" />
                </Column>
                <Column align="center" flexGrow={1} minWidth={250}>
                  <HeaderCell className='text-base text-black font-semibold'>Vehicle Number</HeaderCell>
                  <Cell className='text-slate-950' dataKey="vehicle_unique_no" />
                </Column>
                <Column align='center' flexGrow={2} minWidth={250}>
                  <HeaderCell flexGrow={2} className='text-base text-black font-semibold'>Action</HeaderCell>
                  <Cell>
                    {rowData => {
                      return (
                        <div className="flex items-center justify-center -mt-2">
                          <Button className='h-9 mx-2'>View</Button>
                          <Button className='h-9 mx-2'>Edit</Button>
                          <Button className='h-9 mx-2'>Delete</Button>
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
