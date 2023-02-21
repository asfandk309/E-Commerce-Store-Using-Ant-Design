import { Badge, Button, Checkbox, Drawer, Form, Input, InputNumber, message, Table, Typography } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { getCart } from '../API'

const AppCart = () => {

    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
    const [isCheckoutDrawerOpen, setIsCheckoutDrawerOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])

    useEffect(()=>{
        getCart().then(resp => {
            setCartItems(resp.products)
        })
    },[])

    const onConfirmOrder = (values) => {
        console.log(values);
        setIsCheckoutDrawerOpen(false);
        setIsCartDrawerOpen(false);
        message.success("Your order has been placed successfully!")
    }

  return (
    <div>
        <Badge count={cartItems.length} className="shoppingCartIcon"
            onClick={()=>setIsCartDrawerOpen(true)}
        >
         <ShoppingCartOutlined />
      </Badge>
      <Drawer 
      open={isCartDrawerOpen}
      onClose={()=>setIsCartDrawerOpen(false)}
      title='Your Cart'
      contentWrapperStyle={{width:500}}
      >
        <Table
        pagination={false}
        columns={[
            {
                title:"Title",
                dataIndex:"title"
            },
            {
                title:"Price",
                dataIndex:"price",
                render :(value)=>{
                    return <span>${value}</span>
                }
            },
            {
                title:"Quantity",
                dataIndex:"quantity",
                render :(value,record)=>{
                    return <InputNumber 
                    min={0}
                    defaultValue={value} 
                    onChange={(value)=>{
                        setCartItems((pre)=>
                        pre.map((cart)=>{
                            if(record.id === cart.id) {
                                cart.total = cart.price * value ;
                            }
                            return cart ;
                        })
                        )
                    }}
                    />
                }
            },
            {
                title:"Total",
                dataIndex:"total",
                render :(value)=>{
                    return <span>${value}</span>
                }
            }
        ]}
        dataSource={cartItems}
        summary={(data)=>{
            const total = data.reduce((pre,curr)=>{
                return pre+curr.total;
            },0)
            return <span className='grand_total'>Grand Total: {total}</span>
        }}
        />
        <Button type='primary' onClick={()=>setIsCheckoutDrawerOpen(true)} className='checkout_button' >
            Checkout Your Cart
        </Button>
      </Drawer>

      <Drawer 
      open={isCheckoutDrawerOpen}
      onClose={()=>setIsCheckoutDrawerOpen(false)}
      >
        <Form onFinish={onConfirmOrder} labelCol={{span:8}} > 
            <Form.Item label='Full Name' name='name' 
               rules={[
                {
                    required:true,
                    message:"Please Enter Your Full Name"
                }
               ]}
               hasFeedback
            >
                <Input placeholder='Enter your full Name'/>
            </Form.Item>
            <Form.Item label='Email' name='email'
                rules={[
                    {
                        required:true,
                        message:"Please Enter Your Email"
                    }
                   ]}
                   hasFeedback
                >
                <Input placeholder='Enter your Email'/>
            </Form.Item>
            <Form.Item label='Address' name='address'
                rules={[
                    {
                        required:true,
                        message:"Please Enter Your Address"
                    }
                   ]}
                   hasFeedback
                >
                <Input placeholder='Enter your full Address'/>
            </Form.Item>
            <Form.Item>
                <Checkbox defaultChecked disabled>Cash on Delivery</Checkbox>
            </Form.Item>
            <Typography.Paragraph type='secondary'>More methods coming soon</Typography.Paragraph>
            <Form.Item>
                <Button type='primary' htmlType='submit'>Confrim Order</Button>
            </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default AppCart