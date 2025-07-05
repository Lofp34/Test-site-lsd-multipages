Use HubSpot forms to capture information from website visitors, which you can then access throughout HubSpot. You can share links to forms directly with users, [submit form data via the API](https://developers.hubspot.com/docs/guides/api/marketing/forms), and embed them on your website pages using the CMS.

Forms are a core part of the HubSpot and can be created in HubSpot accounts of any subscription level. Not only are forms important for customer conversion, but also because form data can be used in other HubSpot tools and assets, such as smart content, lists, workflows, content personalization, and more.

After [creating a HubSpot form](https://knowledge.hubspot.com/forms/create-forms), you can add it to your templates and pages. There are a few ways to add a form to a template, depending on your use case:

-   [Using the default form module](https://developers.hubspot.com/docs/guides/cms/content/forms#the-default-form-module)
-   [Adding a form field to a custom module](https://developers.hubspot.com/docs/guides/cms/content/forms#form-fields-in-custom-modules)[](https://developers.hubspot.com/docs/guides/cms/content/forms#using-the-form-hubl-tag)
-   [Embedding using the form embed code](https://developers.hubspot.com/docs/guides/cms/content/forms#using-the-form-embed-code)

If your template has [drag and drop areas](https://developers.hubspot.com/docs/reference/cms/hubl/tags/dnd-areas), content creators can add the [default form module](https://developers.hubspot.com/docs/reference/cms/modules/default-modules#form) to a page from the page editor, then configure the form options in the left sidebar.

To code a form module directly into a template with drag and drop areas, reference it as a `dnd_module`.

To add a form module to a template outside of a drag and drop area, you'll instead reference it as a standard `module`.

With either implementation, you can add parameters to the module tag to specify settings such as the form to use and redirect options, as shown in the code example above. See the [default modules documentation](https://developers.hubspot.com/docs/reference/cms/modules/default-modules#form) for more information on available parameters.

In addition to using the default module as-is, you can clone it to make it editable, enabling you to customize it as needed. For example, you could clone the default form module, add a color field, then wrap the module's HTML in a `<section>` tag with styling to add the color as a background:

-   In the left sidebar design manager, navigate to the **@hubspot** folder, then right click **form.module** and select **Clone module**.

![clone-form-module](https://www.hubspot.com/hubfs/Knowledge_Base_2023_2024/clone-form-module.png)

-   In the right sidebar, click **Add field**, then select **Color**.
-   Add a `<section>` tag around the HTML content, then include styling to reference the color field, such as:

`<section style="background:{{ module.color_field.color }}">`

![default-form-module-clone-section](https://www.hubspot.com/hubfs/Knowledge_Base_2023_2024/default-form-module-clone-section.png)

When creating a custom module, you can include a form in it by adding a [form field](https://developers.hubspot.com/docs/reference/cms/fields/module-theme-fields#form), along with adding the field's code snippet to the module HTML. For example, you may want to add a consultation request form to a module that contains an image of a product and a descriptive value proposition.

To add a form field to a custom module from the design manager:

-   In the right sidebar of the module editor, click **Add field**, then select **Form**.

![design-manager-select-form-field](https://www.hubspot.com/hubfs/Knowledge_Base_2023_2024/design-manager-select-form-field.png)

-   After adding the field, hover over the field in the right sidebar, then click **Actions** and select **Copy snippet**.

![module-field-copy-snippet](https://www.hubspot.com/hubfs/Knowledge_Base_2023_2024/module-field-copy-snippet.png)

-   Paste the snippet into the module's HTML field.

![module-field-paste-snippet](https://www.hubspot.com/hubfs/Knowledge_Base_2023_2024/module-field-paste-snippet.png)

Once added to a page, content creators typically have control over many aspects of the form, including which form to use and the form fields themselves. However, you can limit the amount of control given in the page editor by modifying the form module’s `fields.json` file [locally](https://developers.hubspot.com/docs/guides/cms/setup/getting-started-with-local-development) to include the following fields:

For example, if you’ve built out a module that should only be used for forms that enable visitors to contact your company’s various services departments, you could allow content creators to only be able to select forms that use ticket properties.

When a module or HubL tag isn't ideal, or if you want to add a form to an external page, you can instead embed it using the [form embed code](https://knowledge.hubspot.com/forms/how-can-i-share-a-hubspot-form-if-im-using-an-external-site#add-the-form-embed-code). You can also customize the form embed code to extend the form's functionality. View all form embed code customization options and more in the forms reference guide.

Below is a sample of a form embed code without any customization.

By default, HubSpot provides a number of validation messages in many different languages, which you can access using the `locale` parameter. You can also add custom languages or override the error messages and date picker months/days displayed on the form using the `translation` parameter.

Forms allow two ways to bind functionality onto events: callbacks in the HubSpot form embed code and global form events. Learn more about the available form embed code callbacks and global form events in the [forms reference documentation](https://developers.hubspot.com/docs/reference/cms/forms).

HubSpot forms added to HubSpot pages can be styled using your website's CSS. HubSpot includes a number of different classes and attributes on forms that are generated where you can apply styling. As a starting point, refer to the [HubSpot Boilerplate's form CSS](https://github.com/HubSpot/cms-theme-boilerplate/blob/main/src/css/elements/_forms.css), which represents the best practices for how to style forms.

Forms inside custom modules can be styled by CSS in the module's CSS pane within the design manager. By keeping CSS scoped to the module, you can ensure that whenever the module is added to a page, the styling comes with it. It's recommended to add a wrapper to the form, then using that wrapper as the top-level selector for the CSS. This will prevent your custom module's form styling from being overwritten by additional styles in your websites main stylesheet. Below is a screenshot of the custom module from above with form styling added to the CSS Pane.

![Custom Module with CSS](https://cdn2.hubspot.net/hubfs/53/5Cdocs/forms/form-module-css-pane-4.jpg)

If you have a **_Marketing Hub_** or **_CMS Hub_** _Professional_ or _Enterprise_ subscription, you can use CSS variable definitions to define global styles, customize buttons and other inputs, as well as style your multi-step forms and progress bars.

When using the form embed code, you can style the form using the [global form styling settings](https://knowledge.hubspot.com/forms/set-global-form-colors-and-fonts) or using your website's CSS.

![Global Form Styles](https://cdn2.hubspot.net/hubfs/53/5Cdocs/forms/global-form-styling-options-4.png)

If you have a **_Marketing Hub_** or **_CMS Hub_** _Professional_ or _Enterprise_ subscription, you can select the **Set as raw HTML form** option when creating a form. This setting makes the form render as HTML instead of an iframe, which makes it easier to style the embedded form with CSS.

![Set as raw HTML form setting](https://cdn2.hubspot.net/hubfs/53/5Cdocs/forms/set-as-raw-html-form-4.jpg)