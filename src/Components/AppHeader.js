import React from 'react'
import { Menu } from 'antd'
import { HomeFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Typography from 'antd/es/typography/Typography'
import AppCart from './AppCart'

const AppHeader = () => {

  const navigate = useNavigate()

  const onMenuClick = (item) => {
    navigate(`/${item.key}`)
  }

  return (
    <div className="appHeader">
      <Menu
        className='appMenu'
        onClick={onMenuClick}
        mode='horizontal'
        items={[
          {
            label:  <HomeFilled />,
            key: ""
          },
          {
            label: "Men",
            key: "men",
            children:[
              {
                label:'Shirts',
                key:'mens-shirts'
              },
              {
                label:'Shoes',
                key:'mens-shoes'
              },
              {
                label:'Watches',
                key:'mens-watches'
              }
            ]
          },
          {
            label: "Women",
            key: "women",
            children:[
              {
                label:'Dresses',
                key:'womens-dresses'
              },
              {
                label:'Shoes',
                key:'womens-shoes'
              },
              {
                label:'Watches',
                key:'womens-watches'
              },
              {
                label:'Bags',
                key:'womens-bags'
              },
              {
                label:'Jewellery',
                key:'womens-jewellery'
              }
            ]
          },
          {
            label: "Fragrances",
            key: "fragrances"
          }
        ]}
      />
      <Typography.Title>Asfand Store</Typography.Title>
      <AppCart />
    </div>
  )
}

export default AppHeader;