import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Tshirts = ({ products }) => {
  return (
    <div>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-wrap -m-4  justify-center'>
          {products.length ===0 && <p>Sorry All the T-shirts are currently out of stock. New stock is coming soon.</p>}
            {products.map(item => {
              return (
                <div
                  className='lg:w-1/5 md:w-1/2 p-2 shadow-lg m-4 w-full'
                  key={item.slug}
                >
                  <Link href={`/product/${item.slug}`}>
                    {/* <a className='block relative h-49 rounded overflow-hidden'> */}
                    <Image
                      alt='ecommerce'
                      src={item.img}
                      width={300}
                      height={100}
                    />
                    <div className='mt-4 flex flex-col items-center justify-center'>
                      <h3 className='text-gray-500 text-xs tracking-widest title-font mb-1'>
                      {item.brand.slice(0,1).toUpperCase()+item.brand.slice(1)}/{item.category.slice(0,1).toUpperCase()+item.category.slice(1)}
                      </h3>
                      <h2 className='text-gray-900 title-font text-lg font-medium'>
                        {item.title}
                      </h2>
                      <div className='flex flex-row justify-between items-center mb-2'>
                        <div className='flex justify-start flex-wrap'>
                          {item.variants.map(item => {
                            return (
                              <div
                                key={item.color}
                                title={item.color}
                                className={`w-4 h-4 border shadow-inner bg-${item.color}-700 rounded-full`}
                                style={{ backgroundColor: item.color }}
                              ></div>
                            )
                          })}
                        </div>
                        <div className='text-sm font-semibold'>
                          <span className='line-through mx-2 text-gray-400'>
                            ${item.price}
                          </span>
                          $
                          {item.price -
                            Math.floor((item.price * item.discount) / 100)}
                        </div>
                      </div>
                      <div className='space-x-1  cursor-pointer'>
                        {/* {item.size.split(',').map(item => {
                        return (
                          <div
                            key={item}
                            className='inline-block box-border border-2 p-2 text-sm'
                          >
                            {item}
                          </div>
                        )
                      })} */}

                        {item.variants.some(item => {
                          return Object.keys(item.sizes).includes('S')
                        }) && (
                          <div className='inline-block box-border border-2 px-2 py-2 text-sm'>
                            S
                          </div>
                        )}

                        {item.variants.some(item => {
                          return Object.keys(item.sizes).includes('M')
                        }) && (
                          <div className='inline-block box-border border-2 px-2 py-2 text-sm'>
                            M
                          </div>
                        )}
                        {item.variants.some(item => {
                          return Object.keys(item.sizes).includes('L')
                        }) && (
                          <div className='inline-block box-border border-2 px-2 py-2 text-sm'>
                            L
                          </div>
                        )}
                        {item.variants.some(item => {
                          return Object.keys(item.sizes).includes('XL')
                        }) && (
                          <div className='inline-block box-border border-2 px-2 py-2 text-sm'>
                            XL
                          </div>
                        )}
                        {item.variants.some(item => {
                          return Object.keys(item.sizes).includes('XXL')
                        }) && (
                          <div className='inline-block box-border border-2 px-2 py-2 text-sm'>
                            XXL
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export const getServerSideProps = async () => {
  // Fetch data from external API
  const response = await fetch(`${process.env.HOST}api/getProducts?category=tshirt`)
  const data = await response.json()
  console.log(data)
  const products = data.products
  return { props: { products } }
}

export default Tshirts
