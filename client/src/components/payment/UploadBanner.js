import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'

export const Banner = () => {
	//To Do: Add Date
	return (
		<Box mt={2} mb={4}>
			<Box
				px={2}
				py={3}
				my={2}
				style={{
					borderColor: '#56BD5B',
					borderRadius: 8,
					backgroundColor: 'rgba(86, 189, 91, .1)',
					fontWeight: 'bold',
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<CheckCircle style={{ color: '#56BD5B', marginRight: '4px' }} />
				<Typography
					variant='body1'
					align='flex-start'
					justify='center'
					style={{ color: '#56BD5B', fontWeight: 'bold' }}
				>
					Payment Batch files were successfully submitted to 1GX
				</Typography>
			</Box>
		</Box>
	)
}
