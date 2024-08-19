import React, { useEffect, useState } from 'react'

import { Toaster, toast } from 'sonner'
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Pagination } from 'rsuite';
import Table from 'rsuite/Table';
import { MetroSpinner } from 'react-spinners-kit';

import { useAuth } from '../contexts/AuthContext';
import { readAllBooking } from '../hooks/useBooking'
const { Column, HeaderCell, Cell } = Table;

const Rejectedrequest = () => {
  const { loading, readData, errorMessage, data } = readAllBooking();
  const { userData } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const email = { "email": userData.email };
      await readData(email);
      console.log("Error msg:", errorMessage);
    };
    fetchData();
  }, []);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [bordered, setBordered] = useState(true);
  const [hover, setHover] = useState(true);

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const bookingData = data ? data.bookings : null;

  let tableData;
  if (bookingData) {
    tableData = bookingData
      .filter(booking => booking.status === 'rejected')
      .filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
      });
  }

  if (!data && errorMessage) {
    { toast.error(errorMessage) }
  }

  return (
    <div>
      <div className='flex'>
        <div className='flex flex-col'>
          <div className='text-3xl text-black mt-12 ml-8 font-semibold'>
            Rejected Bookings
          </div>
          <div className='text-lg text-black mt-1 ml-8'>
          Here is the list of all rejected bookings
          </div>
        </div>
      </div>
      {
        !loading ? (

          (bookingData && tableData ? (
            <div className='mt-6 ml-5  mr-5'>
              <Table
                height={400}
                data={tableData}
                hover={hover}
                bordered={bordered}
                cellBordered={bordered}
                color='black'
              >

                <Column align="center" flexGrow={1} fixed minWidth={90}>
                  <HeaderCell className='text-base text-black font-semibold'>
                    Booking ID
                  </HeaderCell>
                  <Cell className='text-slate-950' dataKey="booking_id" />
                </Column>
                <Column align="center" flexGrow={1} minWidth={110}>
                  <HeaderCell className='text-base text-black font-semibold'>Vehicle Type</HeaderCell>
                  <Cell className='text-slate-950' dataKey="vehicle_type" />
                </Column>

                <Column align="center" flexGrow={1} minWidth={100}>
                  <HeaderCell className='text-base text-black font-semibold'>Start</HeaderCell>
                  <Cell className='text-slate-950' dataKey="start" />
                </Column>

                <Column align="center" flexGrow={2} minWidth={120}>
                  <HeaderCell className='text-base text-black font-semibold'>Starting Time</HeaderCell>
                  <Cell className='text-slate-950'>
                    {rowData => {
                      const date = new Date(rowData.start_time);
                      let hours = date.getHours();
                      let minutes = date.getMinutes();
                      const AmPm = hours >= 12 ? 'PM' : 'AM';
                      hours = hours % 12;
                      hours = hours ? hours : 12;
                      minutes = minutes < 10 ? '0' + minutes : minutes;
                      const strTime = hours + ':' + minutes + ' ' + AmPm;
                      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${strTime}`;
                    }}
                  </Cell>
                </Column>

                <Column align="center" flexGrow={1} minWidth={100}>
                  <HeaderCell className='text-base text-black font-semibold'>Destination</HeaderCell>
                  <Cell className='text-slate-950' dataKey="destination" />
                </Column>

                <Column align="center" flexGrow={2} minWidth={120}>
                  <HeaderCell className='text-base text-black font-semibold'>Returning Time</HeaderCell>
                  <Cell className='text-slate-950'>
                    {rowData => {
                      const date = new Date(rowData.return_time);
                      let hours = date.getHours();
                      let minutes = date.getMinutes();
                      const AmPm = hours >= 12 ? 'PM' : 'AM';
                      hours = hours % 12;
                      hours = hours ? hours : 12;
                      minutes = minutes < 10 ? '0' + minutes : minutes;
                      const strTime = hours + ':' + minutes + ' ' + AmPm;
                      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${strTime}`;
                    }}
                  </Cell>
                </Column>

                <Column align="center" flexGrow={1} minWidth={90}>
                  <HeaderCell className='text-base text-black font-semibold'>People</HeaderCell>
                  <Cell className='text-slate-950' dataKey="people" />
                </Column>

                <Column align="center" flexGrow={1} minWidth={90}>
                  <HeaderCell className='text-base text-black font-semibold'>Purpose</HeaderCell>
                  <Cell className='text-slate-950' dataKey="purpose" />
                </Column>

                <Column align="center" flexGrow={1} minWidth={100}>
                  <HeaderCell className='text-base text-black font-semibold'>Name</HeaderCell>
                  <Cell className='text-slate-950' dataKey="name" />
                </Column>

                <Column align="center" flexGrow={1} minWidth={110}>
                  <HeaderCell className='text-base text-black font-semibold'>College ID</HeaderCell>
                  <Cell className='text-slate-950' dataKey="id" />
                </Column>

                <Column align="center" flexGrow={1} minWidth={200}>
                  <HeaderCell className='text-base text-black font-semibold'>Email</HeaderCell>
                  <Cell className='text-slate-950' dataKey="email" />
                </Column>

                <Column align="center" flexGrow={1} minWidth={100}>
                  <HeaderCell className='text-base text-black font-semibold'>Contact</HeaderCell>
                  <Cell className='text-slate-950' dataKey="contact" />
                </Column>

                <Column align="center" flexGrow={1} minWidth={100}>
                  <HeaderCell className='text-base text-black font-semibold'>Status</HeaderCell>
                  <Cell className='text-slate-950' dataKey="status" ></Cell>
                </Column>

                <Column align="center" fixed="right" flexGrow={2} minWidth={200}>
                  <HeaderCell className='text-base text-black font-semibold'>Remarks</HeaderCell>
                  <Cell className='text-slate-950' dataKey="remarks" ></Cell>
                </Column>
              </Table>
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

export default Rejectedrequest
