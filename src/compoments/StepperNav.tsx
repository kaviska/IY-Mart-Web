import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

interface StepperNavProps {
  activeStep: number;
}

const steps = [
  '',
  '',
  '',
];

export default function HorizontalLinearAlternativeLabelStepper({ activeStep }: StepperNavProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index} active={activeStep === index} completed={activeStep > index} disabled={activeStep < index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
     
    </Box>
  );
}