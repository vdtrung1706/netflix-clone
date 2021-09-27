import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: 0,
  marginBottom: 8,
  '&:before': {
    display: 'none',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(4),
  borderTop: '1px solid rgb(0, 0, 0)',
  color: 'rgb(255, 255, 255)',
  backgroundColor: 'rgb(48, 48, 48)',
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        className="text-white"
        sx={{ fontSize: '0.9rem' }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  color: 'rgb(255, 255, 255)',
  backgroundColor: 'rgb(48, 48, 48)',
  padding: 4,
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

export default function QuestionCards() {
  const [expanded, setExpanded] = useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div className="text-xl xl:text-2xl">What is Netflix?</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-xl xl:text-2xl">
            Netflix is a streaming service that offers a wide variety of
            award-winning TV shows, movies, anime, documentaries, and more on
            thousands of internet-connected devices.
            <div className="h-4" />
            You can watch as much as you want, whenever you want without a
            single commercial – all for one low monthly price. There&apos;s
            always something new to discover and new TV shows and movies are
            added every week!
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <div className="text-xl xl:text-2xl">How much does Netflix cost?</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-xl xl:text-2xl">
            Watch Netflix on your smartphone, tablet, Smart TV, laptop, or
            streaming device, all for one fixed monthly fee. Plans range from
            70,000 ₫ to 260,000 ₫ a month. No extra costs, no contracts.
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <div className="text-xl xl:text-2xl">Where can I watch?</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-xl xl:text-2xl">
            Watch anywhere, anytime, on an unlimited number of devices. Sign in
            with your Netflix account to watch instantly on the web at
            netflix.com from your personal computer or on any internet-connected
            device that offers the Netflix app, including smart TVs,
            smartphones, tablets, streaming media players and game consoles.
            <div className="h-4" />
            You can also download your favorite shows with the iOS, Android, or
            Windows 10 app. Use downloads to watch while you&apos;re on the go
            and without an internet connection. Take Netflix with you anywhere.
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <div className="text-xl xl:text-2xl">How do I cancel?</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-xl xl:text-2xl">
            Netflix is flexible. There are no pesky contracts and no
            commitments. You can easily cancel your account online in two
            clicks. There are no cancellation fees – start or stop your account
            anytime.
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel5'}
        onChange={handleChange('panel5')}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <div className="text-xl xl:text-2xl">
            What can I watch on Netflix?
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-xl xl:text-2xl">
            Netflix has an extensive library of feature films, documentaries, TV
            shows, anime, award-winning Netflix originals, and more. Watch as
            much as you want, anytime you want.
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel6'}
        onChange={handleChange('panel6')}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <div className="text-xl xl:text-2xl">Is Netflix good for kids?</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-xl xl:text-2xl">
            The Netflix Kids experience is included in your membership to give
            parents control while kids enjoy family-friendly TV shows and movies
            in their own space.
            <div className="h-4" />
            Kids profiles come with PIN-protected parental controls that let you
            restrict the maturity rating of content kids can watch and block
            specific titles you don’t want kids to see.
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
