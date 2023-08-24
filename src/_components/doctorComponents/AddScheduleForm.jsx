import { useState } from "react"
import { Form, Button, TimePicker, Select, InputNumber, ConfigProvider } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { setSchedules } from '../../slices/scheduleSlice';


const AddScheduleForm = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { schedules } = useSelector(state => state.schedule)

  const dayOptions = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursay' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ]

  const onFinish = async (values) => {
    try {
      const response = await axios.post('/api/doc/schedule', { ...values })
      dispatch(setSchedules(response.data.schedules))
      if (response.data.success)
        toast.success(response.data.msg)
        else 
        toast.error(response.data.msg)
    } catch (error) {
      toast.error(error.response.data)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Toaster />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
        }}
      >
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item className="border-primary rounded-lg shadow-sm focus:border-primary-600 hover:ring-primary-600"
            name='day'
            label='Day'
            rules={[
              { required: true, message: 'Please select a day' },
            ]}
          >
            <Select placeholder="Choose day" className="">
              {dayOptions.map((day, i) => (
                <Select.Option key={i} value={day.value}>{day.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Time'
            name='time'
            rules={[
              { required: true, message: 'Please select a time' },
            ]}
          >
            <TimePicker.RangePicker />
          </Form.Item>
          <Form.Item>

            <Button className=" text-[14px] text-center px-3  block  mx-auto border-2 border-primary text-emerald-600
        hover:text-white hover:bg-primary  active:text-white active:bg-primary"
              type="primary"
              htmlType="submit">
              Add Schedule
            </Button>

          </Form.Item>
        </Form>
      </ConfigProvider>
    </>
  )
}

export default AddScheduleForm