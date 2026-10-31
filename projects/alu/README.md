# 1-bit NAND ALU

**Group leader and primary contributor: Noluthando Palesa Basi**  
CAR150S · CPUT · Semester 2, 2026

[View the portfolio case study](https://zulubarbie.github.io/alu.html)

## My role

I was the group leader and primary contributor, carrying out most of the project work from start to finish. My work spanned the design and simulation process, test preparation, technical documentation and demonstration preparation.

This was a CPUT group project, and I acknowledge my teammates’ participation. The work is presented as a group outcome with my leadership and primary contribution identified, rather than as a solely individual project.

## From concept to NAND gates

The project explores single-bit addition and subtraction, stored mode selection and visual output. Although called an ALU in the coursework, this version performs arithmetic operations only.

The supplied design history contains an earlier Logisim model using built-in arithmetic and multiplexer components, followed by a model containing 24 NAND gates. The board export contains six 74HC00 packages. Working across these representations helped connect abstract logic with individual gates and component-level wiring.

Explore the logic

Model with NAND gates

Review board connections

Check and document

## Physical build

The hardware has been verified. [View the prototype overview and display close-up](https://zulubarbie.github.io/alu.html#build-photos).

## What I worked with

Digital logic

NAND-based arithmetic, an S-R latch for mode memory, output multiplexing and display-driving logic.

Engineering tools

Logisim circuit files, a Tinkercad Circuits working design, an EAGLE-format board export, and technical, test and demonstration documents.

## Verification and evidence

The technical report records eight passing functional netlist cases. A separate portfolio-preparation check on 31 October 2026 evaluated the supplied board export and also passed all eight static input/mode combinations, including mode retention after button release and display-driver polarity.

The physical hardware has also been verified. The eight passing cases above refer specifically to the ideal Boolean netlist check, which is separate from hardware verification.

## Review findings and learning

The review separated logical correctness from hardware readiness. The report flags supply regulation and decoupling work; the board export contains six decoupling capacitors without connected pads. Completion of those corrections is not established by the supplied files.

The latch also needs deliberate mode selection at startup, and simultaneous mode-button presses produce an invalid state. These findings reinforced the value of testing stateful behaviour as well as arithmetic outputs.

The documents propose extending the design to multiple bits. That remains a future development requiring separate carry/borrow-path and timing validation; it is not a demonstrated capability of this portfolio version.

## Academic context and credits

Computer Architecture 1 (CAR150S), Cape Peninsula University of Technology, Semester 2, 2026. Documented with the lecturer’s permission. The assignment brief, rubric, assessment materials, private correspondence and personal student information are excluded.

This public case study summarises the project and my learning. Original project files and detailed submission documents are retained privately.

## Copyright and reuse

Copyright © 2026 Noluthando Palesa Basi, for original material owned by the author. All rights reserved. Teammates, CPUT and third parties retain their respective rights. No ownership of their material is claimed. No additional permission to reproduce, redistribute or modify this material is granted, except as permitted by applicable law or the hosting platform’s terms. Obtain permission from the relevant rights holder for other uses.

This is a portfolio showcase, not an open-source release. Please do not submit this work as your own assessment work.
