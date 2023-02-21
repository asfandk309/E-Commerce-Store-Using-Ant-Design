import { Card, List, Image, Typography, Badge, Rate, Spin, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllProducts, getProductsByCategory } from '../API'
import AddToCartButton from './AddToCartButton'

const Products = () => {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [sortOrder, setSortOrder] = useState("az")

    const param = useParams()

    useEffect(() => {
        // setLoading(true)
        (param?.categoryID
          ? getProductsByCategory(param.categoryID)
          : getAllProducts()
        ).then(resp => {
                setItems(resp.products)
                setLoading(false)
            })
    }, [param])

    const getSortedItems = () => {
        const sortedItems=[...items];
        sortedItems.sort((a,b)=>{

            const small_a = a.title.toLowerCase();
            const small_b = b.title.toLowerCase();
            
            if(sortOrder === "az") {
                return small_a > small_b ? 1 : small_a === small_b ? 0 : -1
            }
            else if(sortOrder === "za") {
                return small_a < small_b ? 1 : small_a === small_b ? 0 : -1
            }
            else  if(sortOrder === "lowHigh") {
                return a.price > small_b.price ? 1 : a.price === small_b.price ? 0 : -1
            }
            else if(sortOrder === "highLow") {
                return a.price < b.price ? 1 : a.price === b.price ? 0 : -1
            }
        })
        return sortedItems;
    }

    if (loading) {
        return <Spin spinning />
    }

    return (
        <div className='product_container'>
            <div>
                <Typography.Text>View Items Sorted By: </Typography.Text>
                <Select
                defaultValue={'az'}
                onChange={(value)=>{
                    setSortOrder(value)
                }}
                options={[
                    {
                        label:'Alphabatically a-z',
                        value:'az'
                    },
                    {
                        label:'Alphabatically z-a',
                        value:'za'
                    },
                    {
                        label:'Price Low to High',
                        value:'lowHigh'
                    },
                    {
                        label:'Price High to Low',
                        value:'highLow'
                    }
                ]}>

                </Select>
            </div>
            <List
                // loading={loading}
                grid={{ column: 3 }}
                renderItem={(product, i) => {
                    return (
                        <Badge.Ribbon className='itemCardBadge' text={`${product.discountPercentage}% Off`} color='pink'>
                            <Card className='itemCard'
                                key={i}
                                title={product.title}
                                cover={<Image className='itemCardImage' src={product.thumbnail} />}
                                actions={[
                                    <Rate value={product.rating} allowHalf disabled />,
                                    <AddToCartButton product={product} />
                                ]}
                            >
                                <Card.Meta title={
                                    <Typography.Paragraph >Price: ${product.price} {" "}
                                        <Typography.Text delete type='danger'>
                                            ${parseFloat(product.price + product.discountPercentage * product.price / 100).toFixed(0)}
                                        </Typography.Text>
                                    </Typography.Paragraph>
                                }
                                    description={<Typography.Paragraph ellipsis={{ rows: 1, expandable: 'true', symbol: 'more' }}>
                                        {product.description}
                                    </Typography.Paragraph>} />
                            </Card>
                        </Badge.Ribbon>
                    )
                }}
                dataSource={getSortedItems()}
            />

        </div>
    )
}

export default Products