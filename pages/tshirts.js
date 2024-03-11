import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Tshirts = ({ products }) => {
  return (
    <div>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-wrap -m-4  justify-center'>
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
                        {item.category}{' '}
                      </h3>
                      <h2 className='text-gray-900 title-font text-lg font-medium'>
                        {item.title}{' '}
                      </h2>
                      <div class='flex flex-row justify-between items-center mb-2'>
                        <div class='flex justify-start flex-wrap'>
                          {item.color.split(',').map(item => {
                            return (
                              <div
                                key={item}
                                title={item}
                                class={`w-3 h-3 border shadow-inner bg-${item}-700 rounded-full`}
                              ></div>
                            )
                          })}
                        </div>
                        <div class='text-sm font-semibold'>
                          <span class='line-through mx-2 text-gray-400'>
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

                        {item.size.includes('S') && (
                          <div className='inline-block box-border border-2 px-2 py-2 text-sm'>
                            S
                          </div>
                        )}

                        {item.size.includes('M') && (
                          <div className='inline-block box-border border-2 px-2 py-2 text-sm'>
                            M
                          </div>
                        )}
                        {item.size.includes('L') && (
                          <div className='inline-block box-border border-2 px-2 py-2 text-sm'>
                            L
                          </div>
                        )}
                        {item.size.includes('XL') && (
                          <div className='inline-block box-border border-2 px-2 py-2 text-sm'>
                            XL
                          </div>
                        )}
                        {item.size.includes('XXL') && (
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
  const response = await fetch('http://localhost:3000/api/getProducts')
  const data = await response.json()
  const products = data.products
  return { props: { products } }
}

export default Tshirts
