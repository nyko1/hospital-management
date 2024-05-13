import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";

@Component({
    selector: 'app-invoice',
    standalone: true,
    templateUrl: './invoice.component.html',
    imports: [HeaderComponent]
})
export class InvoiceComponent {

}
