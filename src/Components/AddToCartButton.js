import { Button, message } from 'antd'
import React, { useState } from 'react'
import { addToCart } from '../API'

const AddToCartButton = ({product}) => {

const [loading, setLoading] = useState(false)

const addProductToCart = () => {
    setLoading(true)
    addToCart(product.id).then(resp => {
        message.success(`${product.title} has been added successfully to Cart!`)
        setLoading(false)
    })
}

  return (
    <div>
        <Button type='link' onClick={addProductToCart} loading={loading}>Add To Cart</Button>
    </div>
  )
}

export default AddToCartButton