import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import Utility from '../utility';

const Colors = Object.keys(Utility.Colors).map(key => Utility.Colors[key]);

const CustomPieChart = ({title, categoryData}) => {
    if (categoryData.length === 0) {
        return (
            <h3 className="text-center mx-3">{title} has no data</h3>
        );
    }
    return (
        <div className="pie-chart-component">
            <h3 className="text-center mt-3">{title}</h3>
            <ResponsiveContainer width={'100%'} height={300}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={categoryData}
                    cx={'50%'}
                    cy={'50%'}
                    outerRadius={100}
                    fill={Utility.Colors.blue}
                    label
                  >
                    {
                      categoryData.map((entry, index) => {
                        return (
                          <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />
                        );
                      })
                    }
                  </Pie>
                  <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

CustomPieChart.propTypes = {
    title: PropTypes.string.isRequired,
    categoryData: PropTypes.array.isRequired
};

export default CustomPieChart;