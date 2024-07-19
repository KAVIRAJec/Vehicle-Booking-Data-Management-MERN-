import React, { useEffect, useState } from 'react'
import { readAllBooking, updateBooking } from '@/hooks/useBooking'
import { toast } from "sonner"
import { useAuth } from '@/contexts/AuthContext';
import { Table, Pagination, SelectPicker } from 'rsuite';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { MetroSpinner } from 'react-spinners-kit';
const { Column, HeaderCell, Cell } = Table;

const Pendingrequest = () => {

  const { userData } = useAuth();
  const { loading, readData, errorMessage, data } = readAllBooking();
  const { updateLoading, updateData, updateErrorMessage } = updateBooking();

  const [booking_id, setBooking_id] = useState(null);
  const [status, setStatus] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (status === 'rejected') {
      setIsDialogOpen(true);
    }
  }, [status]);

  useEffect(() => {
    const updateItems = async () => {
      const update = {
        "booking_id": booking_id,
        "status": status,
        "remarks": remarks,
        "email": userData.email,
      };
      await updateData(update);
      console.log("update Error msg:", updateErrorMessage);
    };
    if (booking_id && (status === 'approved' || status === 'rejected')) {
      updateItems();
    }
  }, [booking_id, status, remarks]);

  useEffect(() => {
    toasting();
  }, [updateErrorMessage]);

  function toasting() {
    if (errorMessage && updateErrorMessage && updateErrorMessage.includes("Booking updated Successfully")) {
      toast.success(updateErrorMessage);
    } else {
      { errorMessage && toast.error(updateErrorMessage) }
    }
  }

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
      .filter(booking => booking.status === 'pending')
      .filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
      });
  }

  const selectData = [
    { label: 'Approve', value: 'approved' },
    { label: 'Reject', value: 'rejected' }
  ];

  if (!data && errorMessage) {
    { toast.error(errorMessage) }
  }

  return (
    <div>
      <div className='flex'>
        <div className='text-2xl text-black mt-12 ml-8 font-semibold'>
          Request to be Approved
        </div>
      </div>
      {
        !loading ? (

          (bookingData && tableData ? (
            <div className='mt-6 ml-5 mr-5'>
              <Table
                height={500}
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

                <Column align="center" fixed="right" flexGrow={1} minWidth={120}>
                  <HeaderCell className='text-base text-black font-semibold'>Status</HeaderCell>
                  <Cell className='text-slate-950'>
                    {rowData => (
                      <div className="-mt-[10px]">

                        <Dialog open={isDialogOpen}>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Remarks for Rejection</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                              make sure to give the reason
                            </DialogDescription>
                            <Input
                              placeholder="Enter Remarks"
                              required
                              onChange={(e) => setRemarks(e.target.value)}
                            />
                            <DialogFooter>
                              <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                              <Button onClick={() => setIsDialogOpen(false)}>Save</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <SelectPicker
                          data={selectData}
                          onChange={(value) => {
                            setBooking_id(rowData.booking_id);
                            setStatus(value);
                            if (value === 'rejected') {
                              setIsDialogOpen(true);
                            }
                            console.log("Set values", rowData.booking_id, value, remarks);
                          }}
                          className='mt-[2px]'
                          searchable={false}
                          placeholder={`${rowData.status}`}
                        />
                      </div>
                    )}
                  </Cell>
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
            </div >
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

    </div >
  )
}

export default Pendingrequest
