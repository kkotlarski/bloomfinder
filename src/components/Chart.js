import React from 'react';
import { AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts';

const strokeColor = {
    chlorA: '#8884d8',
    temperature: '#82ca9d',
}

export default ({data, dataKey, name}) => (
    <div>
        <h3>{name}</h3>
        <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="chlorA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="temperature" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" name={name} dataKey={dataKey} stroke={strokeColor[dataKey]} fillOpacity={1} fill={`url(#${dataKey})`} />
            {/* <Area type="monotone" name="Temperature (C)" dataKey="chlorA" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
        </AreaChart>
    </div>
)
