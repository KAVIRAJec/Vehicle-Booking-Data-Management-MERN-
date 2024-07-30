import React, { useEffect, useState } from 'react'
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Select, SelectItem, SelectLabel, SelectContent, SelectGroup, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, Pagination } from 'rsuite';
import { MetroSpinner } from 'react-spinners-kit';

import { useAuth } from '@/contexts/AuthContext';
import { readBooking } from '@/hooks/useBooking'
const { Column, HeaderCell, Cell } = Table;

const Requesthistory = () => {
  const { loading, readData, errorMessage, data } = readBooking();
  const { userData } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const email = { "email": userData.email };
      readData(email);
      if (errorMessage)
        console.log("Error msg:", errorMessage);
    };
    fetchData();
  }, []);

  const [filteredBookingData, setFilteredBookingData] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [bordered, setBordered] = useState(true);
  const [hover, setHover] = useState(true);
  const [status, setStatus] = useState();

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

const bookingData = data && data.booking ? data.booking : [];

console.log("Booking Data:", bookingData);

  useEffect(() => {
    if (data && data.booking) {
      if (status && status !== " ") {
        setFilteredBookingData(data.booking.filter(booking => booking.status === status));
      } else {
        setFilteredBookingData(data.booking);
      }
    } else {
      setFilteredBookingData(null);
    }
  }, [data, status]);

  let tableData;

  if (filteredBookingData) {
    tableData = filteredBookingData.filter((v, i) => {
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
      <Toaster />
      <div className='flex'>
        <div className='text-2xl text-black mt-12 ml-8 font-semibold'>
          Previously Booked Vehicle
        </div>
        <div className='flex justify-end mr-8 flex-grow'>
          {bookingData &&
            <Select
              onValueChange={(value) => setStatus(value)}
            >
              <SelectTrigger className="w-[180px] mt-12">
                <SelectValue placeholder='Select Status Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value=" ">None</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          }
        </div>
      </div>
      {
        !loading ? (

          (bookingData && tableData ? (
            <div className='mt-6 ml-5  mr-5'>
              <Table
                height={500}
                data={tableData}
                hover={hover}
                bordered={bordered}
                cellBordered={bordered}
                color='black'
              >

                <Column align="center" fixed flexGrow={1}>
                  <HeaderCell className='text-base text-black font-semibold'>
                    Booking ID
                  </HeaderCell>
                  <Cell className='text-slate-950' dataKey="booking_id" />
                </Column>
                <Column align="center" flexGrow={1}>
                  <HeaderCell className='text-base text-black font-semibold'>Vehicle Type</HeaderCell>
                  <Cell className='text-slate-950' dataKey="vehicle_type" />
                </Column>

                <Column align="center" flexGrow={1}>
                  <HeaderCell className='text-base text-black font-semibold'>Start</HeaderCell>
                  <Cell className='text-slate-950' dataKey="start" />
                </Column>

                <Column align="center" flexGrow={2}>
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

                <Column align="center" flexGrow={1}>
                  <HeaderCell className='text-base text-black font-semibold'>Destination</HeaderCell>
                  <Cell className='text-slate-950' dataKey="destination" />
                </Column>

                <Column align="center" flexGrow={2}>
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

                <Column align="center" flexGrow={1}>
                  <HeaderCell className='text-base text-black font-semibold'>People</HeaderCell>
                  <Cell className='text-slate-950' dataKey="people" />
                </Column>

                <Column align="center" flexGrow={1}>
                  <HeaderCell className='text-base text-black font-semibold'>Purpose</HeaderCell>
                  <Cell className='text-slate-950' dataKey="purpose" />
                </Column>

                <Column align="center" flexGrow={1}>
                  <HeaderCell className='text-base text-black font-semibold'>Status</HeaderCell>
                  <Cell className='text-slate-950' dataKey="status" />
                </Column>
                <Column align="center" flexGrow={3}>
                  <HeaderCell className='text-base text-black font-semibold'>Remarks</HeaderCell>
                  <Cell className='text-slate-950' dataKey="remarks" />
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

export default Requesthistory
