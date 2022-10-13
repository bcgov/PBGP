import React, { useState, useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { InputFieldLabel } from 'components/generic'
import { InputFieldError } from 'components/generic'
import { getIn } from 'formik'

export default function TopupFileUpload(props) {
	const [preview, setPreview] = useState(null)
	const imageRef = useRef()
	const error = getIn(props.form.errors, props.field.name)
	const touch = getIn(props.form.touched, props.field.name)
	const handleChange = (e) => {
		let reader = new FileReader()
		reader.readAsDataURL(e.target.files[0])
		reader.onloadend = () => {
			setPreview(reader.result)
			props.form.setFieldValue('void_cheque', reader.result)
		}
	}

	return (
		<div>
			<InputFieldLabel label={props.label} />
			{preview && (
				<>
					<Container maxWidth='md'>
						<Grid item xs={12}>
							<img src={preview} alt='preview' style={{ width: '100%', borderRadius: '8px' }} />
						</Grid>
					</Container>
					<Grid item xs={12}>
						<Button
							color='primary'
							size='medium'
							onClick={() => setPreview(null)}
						>
							Change Image
						</Button>
					</Grid>
				</>
			)}
			{!preview && (
				<>
					<Typography variant="body2" paragraph>
						Void cheque must be made under the name of the organization
					</Typography>


					<label for='file' style={{ cursor: 'pointer' }}>
						<AddAPhotoIcon color='primary' fontSize='large' style={{ margin: 12 }} />
					</label>
					<input
						hidden
						ref={imageRef}
						type='file'
						id='file'
						onChange={handleChange}
						{...props}
					/>
					<div>
						{error && <InputFieldError error={error} />}
					</div>
				</>
			)}
		</div>
	)
}
