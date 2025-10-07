import React from 'react';
import FoodCard from './_components/FoodCard';
import FoodFormDialog from './_components/food-form-dialog';
import { FoodFiltersDrawer } from './_components/food-filters-drawer';

const page = () => {
    return (
        <div className='space-y-2'>
            <div className='flex mb-6 items-center justify-between'>
                <h1 className='text-3xl font-semibold'>Foods List</h1>
                <FoodFormDialog/>
            </div>
            <FoodFiltersDrawer/>
            <FoodCard/>
        </div>
    );
};

export default page;